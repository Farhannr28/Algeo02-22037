import os
import numpy as np

print(os.listdir(r"E:\Tubes-Algeo2\Algeo02-22037\uploads\dataset"))
dic = {'fjfm': [1,2,3,4]}

temp = np.array(list(dic.values())[0])
print(temp)