import NavigationBar from '../components/NavigationBar';
import "../styles/programAlumni.css"
import ProgramAlumniCards from '../components/ProgramAlumniCards';
import { useState, useEffect } from 'react';
import { getProgramAlumni } from '../api/Api';
import Footer from '../components/Footer';


function ProgramAlumni() {
    const [program, setProgram] = useState([]);
    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await getProgramAlumni(); 
                const programArray = response.data.data;

                if (Array.isArray(programArray)) {
                    const programData = programArray.map(item => ({
                        id: item.id,
                        image: item.image,
                        authorId: item.authorId,
                        title: item.title,
                        content: item.description,
                        createdAt: item.createdAt,
                        category: item.category,
                    }));
                    setProgram(programData); 
                } else {
                    console.error("Data yang diterima bukan array:", programArray);
                }
            } catch (error) {
                console.error("Error fetching program: ", error);
            }

        };

        fetchProgram();
    }, []);

    return (
        <>
            <NavigationBar />
            <ProgramAlumniCards program={program} columnCount={3} />
            <Footer />
        </>
    );
}

export default ProgramAlumni;