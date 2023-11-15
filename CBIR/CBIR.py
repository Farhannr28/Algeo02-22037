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
#global variable
selected_option = sys.argv[1]
#global function


def extract_texture_features(image_path,result_dict,lock):
    features = None
    try:    
        rgb_img = Image.open(image_path)
        rgb_img = rgb_img.resize((300,300))
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

def search_similarities(database_features, database_path, query_vector, result_dict):
    try:
        dataset_vector = np.array(database_features[database_path])
        res_value = texture.cosine_similarity(query_vector, dataset_vector)
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
        for i in range(60):
            print(result_list[i])

        profiler.disable()
        profiler.print_stats(sort='cumulative')
        finish = time.perf_counter()
        print(f'Finished in {round(finish-start,2)} second(s)')
        
    elif selected_option == "color":
        pass
