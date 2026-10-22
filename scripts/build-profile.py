"""Build the public executive profile from the website's Spanish content."""
from pathlib import Path
import json, re
from html import escape
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / 'tmp/pdfs/profile-content.json').read_text(encoding='utf8'))
OUTPUT = ROOT / 'public/documents/yamir-rojo-perfil-ejecutivo.pdf'
FONT_DIR = Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('Executive', str(FONT_DIR / 'arial.ttf')))
pdfmetrics.registerFont(TTFont('ExecutiveBold', str(FONT_DIR / 'arialbd.ttf')))
W, H = 595.28, 841.89
INK, MUTED, GREEN, LINE = [colors.HexColor(v) for v in ['#20332e','#6c7a70','#49785c','#dce4d7']]
c = canvas.Canvas(str(OUTPUT), pagesize=(W,H))
c.setTitle('Yamir Rojo | Perfil ejecutivo')
c.setAuthor('Yamir Moisés Rojo Andrade')
c.setSubject('Dirección de operaciones, logística y Supply Chain')
def clean(s):
    return escape(s.replace('–','-').replace('—','-').replace('\u2011','-'))
def text(s,x,y,size=10,color=INK,bold=False):
    c.setFillColor(color); c.setFont('ExecutiveBold' if bold else 'Executive',size); c.drawString(x,y,s)
def paragraph(s,x,y,width,size=9.5,leading=15,color=INK,bold=False):
    style=ParagraphStyle('p',fontName='ExecutiveBold' if bold else 'Executive',fontSize=size,leading=leading,textColor=color)
    p=Paragraph(clean(s),style); _,height=p.wrap(width,H); p.drawOn(c,x,y-height); return y-height
def line(y):
    c.setStrokeColor(LINE); c.setLineWidth(.6); c.line(44,y,W-44,y)
def page_header(section,number):
    text('YR',44,H-47,18,INK,True); text('YAMIR ROJO',83,H-45,9,INK,True)
    text(section,365,H-45,8,GREEN)
    line(H-63)
    line(48); text('yamir@yamirrojo.com  |  +56 9 9691 0700  |  yamirrojo.com',44,32,8,MUTED)
    text(f'{number} / 3',524,32,8,MUTED)
def label(s,y):
    text(s,44,y,8,GREEN,True)

page_header('PERFIL EJECUTIVO',1)
text('Yamir Moisés',44,726,31,INK,True)
text('Rojo Andrade',44,687,31,INK,True)
y=paragraph('Gerente de Operaciones, Logística & Supply Chain',44,658,340,13,19,GREEN)
y=paragraph('Antofagasta - Santiago, Chile | Proyección nacional',44,y-17,360,9,14,MUTED)
photo=ImageReader(str(ROOT/'tmp/pdfs/portrait.jpg'))
c.drawImage(photo,434,668,width=117,height=117,mask='auto',preserveAspectRatio=True,anchor='c')
label('VISIÓN ESTRATÉGICA. RESULTADOS EN TERRENO.',588)
y=paragraph('Ingeniero en Administración Logística con más de 25 años de trayectoria en minería, transporte crítico, combustibles y centros de distribución. Experiencia en dirección de operaciones 24/7, administración de contratos y liderazgo de equipos de más de 300 personas.',44,565,W-88,11,17)
y=paragraph('Trabajo con mandantes, contratistas y subcontratistas para conectar estrategia y ejecución: continuidad de servicio, seguridad operacional, control de KPI, costos, acreditación y mejora continua.',44,y-14,W-88,10,16,MUTED)
line(y-22)
yy=y-52
for index,(metric,title,detail) in enumerate([
    ('6M km','Recorridos anuales','ENEX / RCL - 2022-2025'),
    ('300+','Colaboradores liderados','Viggo - 2021-2022'),
    ('100%','Cumplimiento RECSS','ENEX / RCL - 4 años'),
    ('70','Contratos zona norte','Hualpén - 2019-2021')]):
    x=44+(index%2)*259; row=yy-(index//2)*83
    text(metric,x,row,25,GREEN,True); text(title,x,row-21,9,INK,True); text(detail,x,row-36,8,MUTED)
yy=yy-174
label('ÁREAS DE CONTRIBUCIÓN',yy)
for title,detail in [
    ('Dirección de operaciones','Gestión de flotas, equipos y contratos mineros. Continuidad operacional y relación con mandantes.'),
    ('Logística y cadena de suministro','Abastecimiento, distribución, inventarios, recepción portuaria y transporte especializado.'),
    ('Eficiencia y transformación','Optimización de costos, SAP/WMS, control de riesgos, telemetría y gestión del cambio.')]:
    yy-=24; text(title,44,yy,10,INK,True); yy=paragraph(detail,44,yy-10,W-88,9,14,MUTED)
c.showPage()

page_header('TRAYECTORIA PROFESIONAL',2)
text('Experiencia que genera valor.',44,740,23,INK,True)
y=705
for i,item in enumerate(DATA['experience'][:5]):
    text(item['period'].replace('–','-'),44,y,9,GREEN,True)
    y=paragraph(item['company'],44,y-17,W-88,12,17,INK,True)
    y=paragraph(item['role'],44,y-6,W-88,9,14,MUTED)
    scope = item['scope'] if i==0 else item['highlights'][0]
    y=paragraph(scope,44,y-10,W-88,9,14,INK)
    if i==1:
        y=paragraph('Cero accidentes STP/CTP y 100% de cumplimiento RECSS por cuatro años consecutivos. Más de 300.000 m³ de combustible transportados anualmente.',44,y-7,W-88,9,14,INK)
    y-=14; line(y); y-=20
assert y>65, f'Page 2 content too long: {y}'
c.showPage()

page_header('TRAYECTORIA Y FORMACIÓN',3)
text('Profundidad técnica y formación.',44,740,23,INK,True)
y=704
for item in DATA['experience'][5:]:
    text(item['period'].replace('–','-'),44,y,8,GREEN,True)
    y=paragraph(item['company'],44,y-13,W-88,10,15,INK,True)
    y=paragraph(item['role'],44,y-5,W-88,8.5,12,MUTED)
    y=paragraph(item['highlights'][0],44,y-7,W-88,8.5,13)
    y-=17
line(y+3); y-=21; label('FORMACIÓN ACADÉMICA',y); y-=18
for idx in [0,4,1,5,6]:
    item=DATA['education'][idx]
    title=item['title']
    y=paragraph(title,44,y,W-88,9,13,INK,True)
    status='En curso' if item['status']=='in_progress' else ('Magna Cum Laude - marzo 2026' if item.get('magna') else 'Titulado')
    y=paragraph(item['institution']+' | '+status,44,y-3,W-88,8,12,MUTED)-10
y-=5; label('SISTEMAS, IDIOMAS Y DISPONIBILIDAD',y)
y=paragraph('SAP MM / PM / WMS, Excel avanzado, Guardian, MyPass, SIGA y SERCOL. Español nativo; inglés conversacional medio y traducción técnica avanzada. Dirección ejecutiva, administración de contratos y asesoría especializada.',44,y-15,W-88,8.5,13,MUTED)
assert y>65, f'Page 3 content too long: {y}'
c.save()
print(f'Created {OUTPUT}')
