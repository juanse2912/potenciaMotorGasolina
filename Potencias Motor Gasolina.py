
# coding: utf-8

# In[76]:


from __future__ import print_function
from ipywidgets import interact, interactive, fixed, interact_manual
import ipywidgets as widgets


# In[1]:


# Constantes
n1 = 1.3 #Poder de la gasolina 1
n2 = 1.3 #Poder de la gasolina 2
k = 1.4 #Coeficiente calorífico de los gases
r = 0.287 #Constante universal de los gases
lhv = 44000 #Poder calorífico total del combustible
rca = 14.7 #Relación combustible-aire en vehíuclos de inyección
cv = 0.713 #Relación volúmen-calor en vehículos de inyección


# In[64]:


#Temperatura de compresión
def temperatura_compresion( e, Ta ):
    return e**(k-1)*(Ta+273)

#Densidad de aire en el cilindro
def densidad_aire(Pa, Ta):
    return Pa / ( r*(Ta+273))

#Masa de aire teórica
def masa_aire_t(da, VH, i):
    return da * ((VH/i)*0.001)

#Masa de aire real
def masa_aire_r(mat, n, i, tao):
    return (mat*n*i)/(tao*60)

#Masa de combustible
def masa_combustible(mar):
    return mar/rca

#Calor específico combustión
def calor_especifico(mf):
    return mf*lhv

#Temperatura de combustión
def temperatura_combustion(qf, mar, tc):
    return (qf  / (mar*cv)) + tc

#Presión de combustión
def presion_combustion(tz, pc, tc):
    return pc*(tz/tc)

#Presión del escape
def presion_escape(pz, e):
    return pz/e**k

#temperatura del escape
def temperatura_escape(tz, e):
    return tz/e**(k-1)

#Diferencial de presión indicada
def diferencial_presion_i(pz, pc):
    return pz/pc

#Diferencial de presión escape
def diferencial_presion_e(pz, pv):
    return pz/pv

#Presión Media Indicada
def presion_media_indicada(pa, lambda_i, e):
    return pa * ((e**n1)/(e-1)) * ( lambda_i/(n2-1) * (1/(e**(n2-1))) - (1/(n1-1))* (1/(e**(n2-1))) )

#Potencia indicada
def potencia_indicada(pmi, VH, n):
    #Se convierte pmi de Kpa a kg/cm2
    pmik = pmi/98.066
    return (pmik*VH*n)/900

#Potencia Efectiva
def potencia_efectiva(pme, VH, n):
    #Se convierte pme de Kpa a kg/cm2
    pmek = pme/98.066
    return (pmek*VH*n)/900

#Rendimiento térmico
def rendimiento_termico(e):
    return 1 - (1 / e**(k-1))

#Presión Media Efectiva
def presion_media_e(pa, e, lambda_e, nt):
    return pa * ( (e**(k-1))/(e-1) * (lambda_e-1)/(k-1)) * nt

#Potencia absorvida
def potencia_absorvida(pi, pe):
    return pi-pe


# In[71]:


# Valores de entrada

#Presión de compresión (kpa)
pc = 240.740889 / 0.145
#Cilindrada
VH = 2
#Número de Cilindros
i = 4
#Relación de Compresión
e = 9.5
#Temperatura de admisión (°C)
Ta = 20
#Presión de Admisión (kpa)
pa = 71
#Revs @Potencia Máxima
n = 6000
#Número de ciclos del motor
tao = 4 / 2



# In[79]:


# Valores de entrada
def kpa2kgcm3(pkpa):
    return pkpa/0.145
#Presión de compresión (kpa)
interact(kpa2kgcm3, pkpa=240.740889)
pc = 240.740889 / 0.145
#Cilindrada
VH = 2
#Número de Cilindros
i = 4
#Relación de Compresión
e = 9.5
#Temperatura de admisión (°C)
Ta = 20
#Presión de Admisión (kpa)
pa = 71
#Revs @Potencia Máxima
n = 6000
#Número de ciclos del motor
tao = 4 / 2



# In[72]:


tc = temperatura_compresion(e, Ta)
da = densidad_aire(pa, Ta)
mat = masa_aire_t(da, VH, i)
mar = masa_aire_r(mat, n, i, tao)
mf = masa_combustible(mar)
qf = calor_especifico(mf)
tz = temperatura_combustion(qf,mar,tc)
pz = presion_combustion(tz,pc,tc)
tb = temperatura_escape(tz,e)
pb = presion_escape(pz,e)
lambda_i = diferencial_presion_i(pz,pc)
lambda_e = diferencial_presion_e(pz,pb)
pmi = presion_media_indicada(pa, lambda_i, e)
pi = potencia_indicada(pmi, VH, n)
nt = rendimiento_termico(e)
pme = presion_media_e(pa, e, lambda_e, nt)
pe = potencia_efectiva(pme, VH, n)
pab = potencia_absorvida(pi,pe)
print("Temperatura en Compresión:       %6.4f °K" % tc )
print("Densidad del aire:               %6.4f Kg/m³" % da)
print("Masa de aire teórica:            %6.4f Kg" % mat)
print("Masa de aire real:               %6.4f Kg/s" % mar)
print("Masa de combustible:             %6.4f Kg/s" % mf)
print("Calor específico:                %6.4f KJ/Kg*°K" % qf)
print("Temperatura de combustión:       %6.4f °K" % tz)
print("Presión de combustión:           %6.4f Kpa" % pz)
print("Temperatura en escape:           %6.4f °K" % tb)
print("Presión en escape:               %6.4f Kpa" % pb)
print("Diferencial de presión indicado: %6.4f" % lambda_i)
print("Diferencial de presión efectivo: %6.4f" % lambda_e)
print("Presión Media Indicada:          %6.4f Kpa" % pmi)
print("Potencia Indicada:               %6.4f CV" % pi)
print("Rendimiento térmico:             %6.4f" % nt)
print("Presion media efectiva:          %6.4f Kpa"% pme)
print("Potencia efectiva:               %6.4f CV"% pe)
print("Potencia absorvida:              %6.4f CV"% pab)

