import numpy as np
import math 


def RGBtoGrayscale(R,G,B):
    return 0.29*R + 0.587*G + 0.114*B


def matrixNorm(matrixOcc):
    pass

#menghitung contrast pada matrix
def contrast():
    pass
#menghitung homogenity pada matrix
def homogeneity():
    pass
#menghitung entropy pada matrix
def entropy():
    pass
    
#mencari tingkat kemiripan dengan cosine similarity
def cosine_similarity(a,b):
    return np.dot(a,b)/(np.linalg(a)*np.linalg(b))

