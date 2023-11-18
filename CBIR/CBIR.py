import sys
import CBIRTekstur as texture
import CBIRWarna as color
import numpy as np
from PIL import Image
import os
import threading
import time
import cProfile
import concurrent.futures
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
#global variable
selected_option = sys.argv[1]
#global function

# --- Similarity ---
def cosine_similarity(a,b):
    dots = np.einsum('ij, ij->i', a,b)
    norms = np.linalg.norm(a, axis = 1)*np.linalg.norm(b, axis = 1)
    return np.where(norms==0, 0, np.divide(dots, norms, where=norms!=0))

def search_similarities(database_features, database_path, query_vector, result_dict):
    try:
        dataset_vector = np.array(database_features[database_path])
        res_value = cosine_similarity(query_vector, dataset_vector)
    except Exception as e:
        print(f"Error processing {database_path}: {e}")
        res_value = None
    
    result_dict[database_path] = res_value

def perform_similarity_analysis(database_features, query_feature):
    result_dict = {}
    query_vector = np.array(list(query_feature.values())[0])

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = {executor.submit(search_similarities, database_features, path, query_vector, result_dict): path for path in database_features}

        # Wait for all threads to finish
        concurrent.futures.wait(futures)

    return result_dict

# --- Color ---
def perform_color_analysis_query(image_paths, base_path):
    try:
        repVal = np.empty((75, 75), dtype=object)
        for i in range(75):
            for j in range(75):
                repVal[i,j] = np.zeros((1,3))

        for image_filename in image_paths:
            image_path = os.path.join(base_path,image_filename)
            # print(image_path)
            rgb_img = Image.open(image_path)
            rgb_img = rgb_img.resize((300,300))
            if rgb_img.mode != 'RGB':
                raise ValueError("Image is not in RGB mode.")
            img = np.array(rgb_img)
            hsv = color.RGBtoHSV(img)
            blocks = hsv[:75 * 4, :75 * 4].reshape(75, 4, 75, 4, 3)
            repVal = np.sum(blocks, axis=(1,3))
            repVal /= 16
            repVal.resize(5625,3)
            # repVal = repVal.transpose()
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
    return repVal

def perform_color_analysis_database(image_paths, base_path, query):
    try:
        resultDict = {}
        for image_filename in image_paths:
            # picstart = time.perf_counter()
            image_path = os.path.join(base_path,image_filename)
            rgb_img = Image.open(image_path)
            rgb_img = rgb_img.resize((300, 300))
            if rgb_img.mode != 'RGB':
                raise ValueError("Image is not in RGB mode.")
            
            img = np.array(rgb_img)
            hsv = color.RGBtoHSV(img)
            blocks = hsv[:75 * 4, :75 * 4].reshape(75, 4, 75, 4, 3)
            repVal = np.sum(blocks, axis=(1,3))
            repVal /= 16
            repVal.resize(5625,3)
            result = np.where(repVal.any(axis = 1), cosine_similarity(repVal, query), 0)
            similarity = np.sum(result)
            resultDict[image_path] = similarity
            # picend = time.perf_counter()
            # print(f"picture {image_path} done in {picend - picstart}\n")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
    return resultDict

# --- Texture ---

def extract_texture_features(image_path,result_dict,lock):
    features = None
    try:    
        rgb_img = Image.open(image_path)
        rgb_img = rgb_img.resize((300, 300))
        if rgb_img.mode != 'RGB':
            raise ValueError("Image is not in RGB mode.")
        img_grayscale = texture.convertToGrayscale(rgb_img)
        coocurence_matrix = texture.cooccurenceMatrix(img_grayscale,0)
        glcm_matrix = texture.symmetricMatrix(coocurence_matrix)
        glcm_matrix = texture.normMatrix(glcm_matrix)
        
        energy = texture.energy(glcm_matrix)
        entropy = texture.entropy(glcm_matrix)
        contrast = texture.contrast(glcm_matrix)
        homogenity = texture.homogenity(glcm_matrix)
        asm = texture.ASM(glcm_matrix)
        dissimilarity = texture.dissimilarity(glcm_matrix)
        features = [energy,entropy,contrast,homogenity,asm,dissimilarity]
        
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

    with lock :
            result_dict[image_path] = features

def perform_texture_analysis(image_paths,base_path):
    try:
        result_dict = {}
        lock = threading.Lock()
        threads = []

        for image_filename in image_paths:
            image_path = os.path.join(base_path,image_filename)
            thread = threading.Thread(target=extract_texture_features, args=(image_path, result_dict,lock))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
    return result_dict

# --- Main ---

if __name__ == "__main__" :
    start = time.perf_counter()
    if selected_option == "texture":
        script_path_relative = os.path.dirname(os.path.abspath(__file__))
        base_path_query  = os.path.join(script_path_relative,'..','uploads','client_image')
        base_path_query_list = os.listdir(base_path_query)

        profiler = cProfile.Profile()
        profiler.enable()
        #perform extract query image
        query_features = perform_texture_analysis(base_path_query_list,base_path_query)
        
        #perform extract dataset
        base_path_database = os.path.join(script_path_relative,'..','uploads','dataset')
        database_path  = os.listdir(base_path_database)
        database_features = perform_texture_analysis(database_path,base_path_database)   

        #perform search similarity
        
        result_similarity = perform_similarity_analysis(database_features,query_features)
        sorted_result = dict(sorted(result_similarity.items(), key=lambda item: item[1],reverse=True))
        result_list = list(sorted_result.items())
        for i in (result_list):
            if  i[1]>0.60:
                print(i)

        profiler.disable()
        profiler.print_stats(sort='cumulative')
        finish = time.perf_counter()
        print(f'Finished in {round(finish-start,2)} second(s)')
        
    elif selected_option == "color":
        script_path_relative = os.path.dirname(os.path.abspath(__file__))
        base_path_query  = os.path.join(script_path_relative,'..','uploads','client_image')
        base_path_query_list = os.listdir(base_path_query)

        profiler = cProfile.Profile()
        profiler.enable()
        #perform extract query image
        query_representative_blocks = perform_color_analysis_query(base_path_query_list,base_path_query) 
        #perform extract dataset
        base_path_database = os.path.join(script_path_relative,'..','uploads','dataset')
        database_path  = os.listdir(base_path_database)
        database_result = perform_color_analysis_database(database_path,base_path_database, query_representative_blocks)
        sorted_result = dict(sorted(database_result.items(), key=lambda item: item[1], reverse=True))
        result_list = list(sorted_result.items())
        temp = 0
        for i in (result_list):
            if  i[1]>3375: #60%
                print(i)
        profiler.disable()
        profiler.print_stats(sort='cumulative')
        finish = time.perf_counter()
        print(f'Finished in {round(finish-start,2)} second(s)')