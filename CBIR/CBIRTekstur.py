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

def normMatrix(matrixSym):
    sum = matrixSym.sum()
    return (matrixSym/sum)
#metric texture
#menghitung contrast pada matrix
def contrast(matrixNorm):
    sum =0
    for i in range(len(matrixNorm)):
        for j in range(len(matrixNorm)):
            sum += matrixNorm[i][j]*(i-j)**2
    return sum
#menghitung homogenity pada matrix
def homogeneity(matrixNorm):
    sum =0
    for i in range(len(matrixNorm)):
        for j in range(len(matrixNorm)):
            sum+= matrixNorm[i][j]/(1+(i-j)**2)
#menghitung entropy pada matrix
def entropy(matrixNorm):
    sum =0
    for i in range(len(matrixNorm)):
        for j in range(len(matrixNorm)):
            sum+= matrixNorm[i][j]*log2(matrixNorm[i][j])
    return sum*(-1)
#menghitung ketidaksamaan
def dissimilarity(matrixNorm):
    sum =0
    for i in range(len(matrixNorm)):
        for j in range(len(matrixNorm)):
            sum+= matrixNorm[i][j]*abs(i-j)
    return sum
#menghitung angular second moment
def ASM(matrixNorm):
    sum =0
    for i in range(len(matrixNorm)):
        for j in range(len(matrixNorm)):
            sum+= matrixNorm[i][j]**2
    return sum
#menghitung energy
def energy(matrixNorm):
    return sqrt(ASM(matrixNorm))
#menghitung GLCM mean
def mean(matrixNorm):
    sumI =0
    sumJ=0
    length = len(matrixNorm)
    for i in range(length):
        for j in range(length):
            sumI+= i*matrixNorm[i][j]
            sumJ+= j*matrixNorm[i][j]
    return sumI,sumJ
#menghitung GLCM variance
def var(matrixNorm):
    sumI = 0
    sumJ =0
    meanI,meanJ = mean(matrixNorm)
    length = len(matrixNorm)
    for i in range(length):
        for j in range(length):
            sumI+=matrixNorm[i][j]*(i-meanI)**2
            sumJ+=matrixNorm[i][j]*(j-meanJ)**2 
    return sumI,sumJ
#menghitung GLCM correlation
def correlation(matrixNorm):
    meanI,meanJ = mean(matrixNorm)
    varI,varJ = var(matrixNorm)
    sum = 0
    for i in range(len(matrixNorm)):
        for j in range(len(matrixNorm)):
            sum += matrixNorm[i][j]*((i-meanI)*(j-meanJ)/(sqrt(varI*varJ)))
    return sum
    
#mencari tingkat kemiripan dengan cosine similarity
def cosine_similarity(a,b):
    return np.dot(a,b)/(np.linalg(a)*np.linalg(b))



