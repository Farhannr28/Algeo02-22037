import numpy as np
from PIL import Image
from math import *

"""
def Norm(a):
    return a/255

def Hue(R,G,B, Cmax, Delta):
    if (Delta == 0):
        return 0
    elif(Cmax == R):
        return (pi/3)*((G - B)/Delta)%6
    elif(Cmax == G):
        return (pi/3)*(((B - R)/Delta)+2)
    else:
        return (pi/3)*(((R - G)/Delta)+4)

def Sat(Cmax, Delta):
    if(Cmax == 0):
        return 0
    else:
        return Delta/Cmax

def HSVPixel(R,G,B):
    R /= 225
    G /= 225
    B /= 225
    Cmin = min(R,G,B)
    Cmax = max(R,G,B)
    Delta = Cmax - Cmin
    return np.array([Hue(R,G,B,Cmax,Delta), Sat(Cmax, Delta), Cmax])
"""

def RGBtoHSV(arr):
    arr = arr / 225
    Val = np.max(arr, axis=-1) #Cmax
    Cmin = np.min(arr, axis=-1)
    Delta = Val - Cmin
    Sat = np.where(Val == 0, 0, np.divide(Delta, Val, where=Val!=0))
    R = arr[:,:,0]
    G = arr[:,:,1]
    B = arr[:,:,2]
    Hue = np.where(Delta == 0, 0, 
        np.select([Val == R, Val == G, Val == B], [np.divide(((pi/3)*(G - B)), Delta, where=Delta!=0)%6, 
                                                   np.divide(((pi/3)*(B - R)), Delta, where=Delta!=0)+2, 
                                                   np.divide((pi/3)*(R - G), Delta, where=Delta != 0)+4]))
    return np.stack([Hue, Sat, Val], axis = -1)