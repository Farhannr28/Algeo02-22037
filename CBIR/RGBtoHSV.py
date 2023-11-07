from math import *

def Norm(a):
    return a/255

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

def Cmax(R,G,B):
    return Max(Norm(R), Norm(G), Norm(B))

def Cmin(R,G,B):
    return Min(Norm(R), Norm(G), Norm(B))

def Delta(R,G,B):
    return Cmax(R,G,B)-Cmin(R,G,B)

def Hue(R,G,B):
    if(Cmax(R,G,B) == Norm(R)):
        return (pi/3)*((Norm(G)-Norm(B))/Delta(R,G,B))%6
    elif(Cmax(R,G,B) == Norm(G)):
        return (pi/3)*(((Norm(B)-Norm(R))/Delta(R,G,B))+2)
    else:
        return (pi/3)*(((Norm(R)-Norm(G))/Delta(R,G,B))+4)

def Sat(R,G,B):
    if(Cmax(R,G,B)==0):
        return 0
    else:
        return Delta(R,G,B)/Cmax(R,G,B)

def Val(R,G,B):
    return Cmax(R,G,B)

