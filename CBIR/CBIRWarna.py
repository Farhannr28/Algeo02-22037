import numpy as np
from PIL import Image
from math import *

def Norm(a):
    return a/255

"""
def Max(a, b, c):
    if (a>b):
        if (a>c):
            return a
        else:
            return c
    else:
        if (b>c):
            return b
        else:
            return c 
            
def Min(a, b, c):
    if (a<b):
        if (a<c):
            return a
        else:
            return c
    else:
        if (b<c):
            return b
        else:
            return c 

def Delta(R,G,B):
    return Cmax(R,G,B)-Cmin(R,G,B)
"""

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

"""
def Val(Cmax):
    return Cmax
"""

"""
def RGBtoHSV(R,G,B,size):
    H = np.zeros((size,size))
    S = np.zeros((size,size))
    V = np.zeros((size,size))
    for i in range(size):
        for j in range(size):
            newR = Norm(R[i , j])
            newG = Norm(G[i , j])
            newB = Norm(B[i , j])
            Cmin = min(newR,newG,newB)
            Cmax = max(newR,newG,newB)
            Delta = Cmin - Cmax
            H[i , j] = Hue(newR, newG, newB, Cmax, Delta)
            S[i , j] = Sat(Cmax, Delta)
            V[i , j] = Cmax
    return H,S,V
"""

def HSVPixel(R,G,B):
    R /= 225
    G /= 225
    B /= 225
    Cmin = min(R,G,B)
    Cmax = max(R,G,B)
    Delta = Cmin - Cmax
    return np.array([Hue(R,G,B,Cmax,Delta), Sat(Cmax, Delta), Cmax])