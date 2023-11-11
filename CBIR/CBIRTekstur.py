from math import *
import numpy as np

def convertGrayscale(R, G, B):
    return 0.29 * R + 0.587 * G + 0.114 * B

def cooccurenceMatrix(matrix, angle):
    res = np.zeros((256,256))
    x = cos(angle)
    y = sin(angle)

    if (x < 0.5):
        x = 0
    else:
        x = 1

    if (y < 0.5):
        y = 0
    else:
        y = 1
        
    size = matrix.shape
    for i in range(size[0] - y): # i + y < size[]
        for j in range(size[1] - x): # j + x < size[]
            row = matrix[i,j]
            col = matrix[i+y,j+x]
            res[row, col] += 1
    return res    

def symmetricMatrix(matrixCo):
    t = matrixCo.transpose()
    res = t + matrixCo
    return res

def matrixNorm(matrixSym):
    sum = matrixSym.sum()
    return (matrixSym/sum)

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