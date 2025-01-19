import NavigationBar from '../components/NavigationBar';
import "../styles/berita.css"
import BeritaCards from '../components/BeritaCards';
import { useState, useEffect } from 'react';
import { getNews } from '../api/Api';
import Footer from '../components/Footer';

function Berita() {
    const [berita, setBerita] = useState([]);
    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await getNews();
                const beritaArray = response.data.data;
    
                if (Array.isArray(beritaArray)) {
                    const beritaData = beritaArray.map(item => ({
                        id:item.id,
                        image: item.image,
                        author: item.author,
                        authorId: item.authorId,
                        title: item.title,
                        content: item.content,
                        createdAt: item.createdAt,
                    }));
                    setBerita(beritaData);
                } else {
                    console.error("Data yang diterima bukan array:", beritaArray);
                }
            } catch (error) {
                console.error("Error fetching news: ", error);
            }
    
        };
        fetchBerita();
    }, []);

    return (
        <>
            <NavigationBar />
            <BeritaCards berita={berita} columnCount={3} />
            <Footer/>
        </>
    );
}

export default Berita;