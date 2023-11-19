import React from 'react';
import fotoswys from './swys.PNG'
import normMat from './normMat.PNG'
import cosin from './cosin.PNG'


const HowItWork = () => {
  return (
    <div>
      <div className='my-[50px] text-white block mb-[200px]'>
        <img className='mx-auto' src={fotoswys} alt="" />
        <div className=' py-16 mt-[20px] text-5xl mx-[300px] bg-[#6C5F5B] rounded-xl'>
            <h1 className=' mx-20 mb-16'>Reverse Image Search</h1>
            <div className='inline-block mx-10 text-justify'>
                <p className='text-[25px] mb-8'><span className='ml-10'></span>Reverse Image Search ini dibuat denagn mengimplementasikan sistem temu balik gambar yang memanfaatkan aljabar vektor. Dalam konteks ini, aljabar vektor digunakan untuk menggambarkan dan menganalisis data menggunakan pendekatan klasifikasi berbasis konten (Content-Based Image Retrieval atau CBIR), di mana sistem temu balik gambar bekerja dengan mengidentifikasi gambar berdasarkan konten visualnya, seperti warna dan tekstur.</p>
                <p className='text-[25px] my-4'><span className='ml-10'></span>CONTENT-BASED INFORMATION RETRIEVAL (CBIR)</p>
                <p className='text-[25px] my-4'><span className='ml-10'></span>Content-Based Image Retrieval (CBIR) adalah sebuah proses yang digunakan untuk mencari dan mengambil gambar berdasarkan kontennya. Proses ini dimulai dengan ekstraksi fitur-fitur penting dari gambar, seperti warna, tekstur, dan bentuk. Setelah fitur-fitur tersebut diekstraksi, mereka diwakili dalam bentuk vektor atau deskripsi numerik yang dapat dibandingkan dengan gambar lain. Kemudian, CBIR menggunakan algoritma pencocokan untuk membandingkan vektor-fitur dari gambar yang dicari dengan vektor-fitur gambar dalam dataset. Hasil dari pencocokan ini digunakan untuk mengurutkan gambar-gambar dalam dataset dan menampilkan gambar yang paling mirip dengan gambar yang dicari.</p>
                <p className='text-[25px] my-4'><span className='ml-10'></span>CBIR dengan parameter warna</p>
                <p className='text-[25px] my-4'><span className='ml-10'></span>Pada CBIR ini, input gambar akan dibandingkan dengan dataset gambar, hal ini dilakukan dengan cara mengubah input gambar yang berbentuk RGB menjadi histogram warna yang lebih umum. Pada perhitungan histogram, warna global HSV lebih dipilih karena warna tersebut dapat digunakan pada kertas (background berwarna putih) yang lebih umum untuk digunakan.</p>
                <p className='text-[25px] my-4'><span className='ml-10'></span>CBIR dengan parameter tekstur</p>
                <p className='text-[25px] my-4'><span className='ml-10'></span>CBIR dengan perbandingan tekstur dilakukan menggunakan suatu matriks yang dinamakan co-occurrence matrix. Matriks ini digunakan karena dapat melakukan pemrosesan yang lebih mudah dan cepat. Vektor yang dihasilkan juga mempunyai ukuran yang lebih kecil. Setelah didapat co-occurrence matrix, buatlah symmetric matrix dengan menjumlahkan  co-occurrence matrix dengan hasil transpose-nya. Lalu cari matrix normalization dengan persamaan.</p>
                <img src={normMat} alt="normMat" className='mx-auto' />
                <p className='text-[25px] my-4'><span className='ml-10'></span>Kemudian Ukur kemiripan dari kedua gambar menggunakan <i>Teorema Cosine Similarity, yaitu</i>:</p>
                <img src={cosin} alt="normMat" className='mx-auto' />
                <p className='text-[25px] my-4'><span className='ml-10'></span>Disini A dan B adalah dua vektor dari dua gambar. Semakin besar hasil Cosine Similarity kedua vektor maka tingkat kemiripannya semakin tinggi.</p>

                
            </div>
            
        </div>
        <div className='flex justify-center'>
           

        </div>

       
    </div>
    </div>
  );
};

export default HowItWork;