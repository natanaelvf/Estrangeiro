// Sample data initialization script
// This adds placeholder content to demonstrate the website
//
// ⚠️ IMPORTANT: After editing this file, you MUST clear localStorage!
// In browser console (F12): localStorage.clear(); location.reload();
// OR run the reset-data.js script in the console
//
// The init function below only runs if localStorage is empty (line 6-9)

(function initSampleData() {
  // Check if sample data already exists
  const existingData = localStorage.getItem("estrangeiro_submissions");
  if (existingData && JSON.parse(existingData).length > 0) {
    console.log("Sample data already exists, skipping initialization");
    return;
  }

  const sampleSubmissions = [
    // Text submissions (content loaded from .txt files in /assets/texts/)
    {
      id: "text-carolina-fidalgo-1",
      type: "text",
      title: "Cães Brancos, Cães Pretos",
      description:
        "Um conto sobre superstição, medo e a construção de muros invisíveis numa cidade cercada",
      creator: "Carolina Fidalgo",
      content: "/assets/texts/carolina_fidalgo/caes_brancos_caes_pretos.txt",
      contentType: "file",
      timestamp: new Date(2025, 10, 15).getTime(),
      views: 34,
    },
    {
      id: "text-delano-valentim-1",
      type: "text",
      title: "Dona Tânia",
      description:
        "Embora os fatos narrados e os personagens sejam fictícios, esta obra de ficção é inspirada por experiências e observações da infância e adolescência do autor",
      creator: "Delano Valentim",
      content: "/assets/texts/delano_valentim/dona_tania.txt",
      contentType: "file",
      timestamp: new Date(2025, 9, 20).getTime(),
      views: 45,
    },
    {
      id: "text-delano-valentim-2",
      type: "text",
      title: "Lá",
      description:
        "Uma reflexão sobre pertencimento, deslocamento e a busca pelo interior das coisas",
      creator: "Delano Valentim",
      content: "/assets/texts/delano_valentim/la.txt",
      contentType: "file",
      timestamp: new Date(2025, 11, 5).getTime(),
      views: 38,
    },
    {
      id: "text-eugenio-luis-1",
      type: "text",
      title: "Sinais de fumo",
      description:
        "Um poema sobre demónios interiores e a linguagem do medo",
      creator: "Eugénio Luís",
      content: "/assets/texts/eugenio_luis/sinais_de_fumo.txt",
      contentType: "file",
      timestamp: new Date(2025, 8, 10).getTime(),
      views: 22,
    },
    {
      id: "text-eugenio-luis-2",
      type: "text",
      title: "Eu não sei parar",
      description:
        "Um poema sobre o vazio recorrente, a solidão e a incapacidade de parar",
      creator: "Eugénio Luís",
      content: "/assets/texts/eugenio_luis/eu_nao_sei_parar.txt",
      contentType: "file",
      timestamp: new Date(2025, 8, 12).getTime(),
      views: 19,
    },
    {
      id: "text-marinah-raposo-1",
      type: "text",
      title: "Sou o que sobrou do seu rastro",
      description:
        "Um poema sobre colonialismo, identidade fragmentada e a reconstrução da memória",
      creator: "Marinah Raposo",
      content: "/assets/texts/marinah_raposo/seu_rastro.txt",
      contentType: "file",
      timestamp: new Date(2025, 10, 1).getTime(),
      views: 41,
    },
    {
      id: "text-natanael-ferreira-1",
      type: "text",
      title: "Vida",
      description:
        "Um poema sobre a vida que passa como navios e a fragilidade das ligações humanas",
      creator: "Natanael Ferreira",
      content: "/assets/texts/natanael_ferreira/vida.txt",
      contentType: "file",
      timestamp: new Date(2025, 7, 25).getTime(),
      views: 28,
    },
    {
      id: "text-natanael-ferreira-2",
      type: "text",
      title: "Estrangeiros para sempre",
      description:
        "Um poema sobre a condição permanente de ser estrangeiro e a busca por pertencimento",
      creator: "Natanael Ferreira",
      content: "/assets/texts/natanael_ferreira/estrangeiros_para_sempre.txt",
      contentType: "file",
      timestamp: new Date(2025, 7, 28).getTime(),
      views: 36,
    },
    {
      id: "text-natanael-ferreira-3",
      type: "text",
      title: "Vagamundos",
      description:
        "Um poema sobre migração e a eterna busca por um lugar a que chamar casa",
      creator: "Natanael Ferreira",
      content: "/assets/texts/natanael_ferreira/vagamundos.txt",
      contentType: "file",
      timestamp: new Date(2025, 7, 30).getTime(),
      views: 31,
    },
    {
      id: "text-neuzi-barbarini-1",
      type: "text",
      title: "Ai de ti, estrangeira",
      description:
        "Um poema sobre a experiência de ser estrangeira em terras perto do mar que banha as suas outras terras",
      creator: "Neuzi Barbarini",
      content: "/assets/texts/neuzi_barbarini/ai_de_ti.txt",
      contentType: "file",
      timestamp: new Date(2025, 9, 8).getTime(),
      views: 27,
    },
    {
      id: "text-vera-araujo-1",
      type: "text",
      title: "Tod@s somos estrangeir@s em algum lugar",
      description:
        "Uma reflexão sobre estrangeiridade, pertencimento e a liberdade discreta de não pertencer por inteiro",
      creator: "Vera Araújo",
      content: "/assets/texts/vera_araujo/estrangeiros_em_algum_lugar.txt",
      contentType: "file",
      timestamp: new Date(2025, 10, 20).getTime(),
      views: 52,
    },
    {
      id: "text-paula-lima-1",
      type: "text",
      title: "No centro do mundo não tem lugar",
      description:
        "Uma crónica sobre migração, identidade, memória familiar e violência institucional",
      creator: "Paula Lima",
      content: "/assets/texts/paula_lima/centro_do_mundo.txt",
      contentType: "file",
      timestamp: new Date(2025, 11, 10).getTime(),
      views: 63,
    },

    // Video submissions (YouTube links)
    {
      id: "chosen-video-1",
      type: "video",
      title: "Irish Travellers",
      description: `Irish Travelers live on the fringes of society and their living conditions are on a downward spiral. 
        A recent EU study revealed shocking figures: 11% of Irish travellers die by suicide and most die before the age of 65. 
        No other minority in Europe faces such dire statistics.`,
      creator: " ARTE.tv",
      content: "https://www.youtube.com/watch?v=2vKhhqVNd4c",
      contentType: "link",
      timestamp: new Date(2022, 12, 16).getTime(),
      views: 67,
    },
    {
      id: "chosen-video-2",
      type: "video",
      title: "Island of my Dreams",
      description: `A Documentary about the migration of Azorean and Portuguese people to the United States.`,
      creator: "Ricardo Rebelo",
      content: "https://www.youtube.com/watch?v=aZa2LaEIluQ",
      contentType: "link",
      timestamp: new Date(2019, 8, 22).getTime(),
      views: 67,
    },
    {
      id: "chosen-video-3",
      type: "video",
      title: "Balada de um Batráquio",
      description: `Simultaneamente estranhos e familiares, distantes e próximos, inquietantes e sedutores, marginais e cosmopolitas, 
      os ciganos apresentam-se envoltos numa aura de ambiguidade. 
      Não se pode dizer que sejam invisíveis, pois dificilmente passam despercebidos.`,
      creator: "Leonor Teles",
      content:
        "https://www.youtube.com/watch?v=F5OdsHAX2AQ&list=RDF5OdsHAX2AQ&start_radio=1",
      contentType: "link",
      timestamp: new Date(2016, 5, 20).getTime(),
      views: 67,
    },
    // Music submissions
    {
      id: "chosen-music-1",
      type: "music",
      title: "Belchior - Fotografia 3X4",
      description: `A minha história é ... talvez
é talvez igual a tua, jovem que desceu do norte
que no sul viveu na rua
e que andou desnorteado, como é comum no seu tempo
e que ficou desapontado, como é comum no seu tempo
e que ficou apaixonado e violento como, como você
Eu sou como você. Eu sou como você.`,
      creator: "Belchior",
      content: "https://www.youtube.com/watch?v=5-uOtYPSNBs",
      contentType: "link",
      timestamp: new Date(1976, 5).getTime(),
      views: 15,
    },
    {
      id: "chosen-music-2",
      type: "music",
      title: "Raul Seixas - Ouro De Tolo",
      description: `Eu devia estar contente
Porque eu tenho um emprego
Sou o dito cidadão respeitável
E ganho quatro mil cruzeiros por mês`,
      creator: "Raul Seixas",
      content: "https://www.youtube.com/watch?v=7MSCzIxhFKI",
      contentType: "link",
      timestamp: new Date(1973, 6, 21).getTime(),
      views: 22,
    },
    {
      id: "chosen-music-3",
      type: "music",
      title: "Gilberto Gil - 1975 - Refazenda - 10 Lamento Sertanejo",
      description: `Por ser de lá do sertão
Lá do cerrado
Lá do interior, do mato
Da caatinga, do roçado
Eu quase não saio
Eu quase não tenho amigo
Eu quase que não consigo
Ficar na cidade sem viver contrariado`,
      creator: "Gilberto Gil",
      content: "https://www.youtube.com/watch?v=O6CQsOI2qMg",
      contentType: "link",
      timestamp: new Date(1975).getTime(),
      views: 8,
    },
    {
      id: "chosen-music-4",
      type: "music",
      title: "Vera Bila, Kale - Pas o panori",
      description: "Music video by Vera Bila & Kale performing Pas o panori",
      creator: "Vera Bila, Kale",
      content: "https://youtu.be/R-L477kx8LA?si=qR7AnBd1SaDFgfsJ",
      contentType: "link",
      timestamp: new Date(1998, 2).getTime(),
      views: 8,
    },

    // Picture submissions
    {
      id: "chosen-picture-1",
      type: "picture",
      title: "Tod@s somos estrangeir@s em algum lugar",
      description: `Uma vez li esta frase gravada num muro: 
“Tod@s somos estrangeir@s em algum lugar”. 
E é verdade… não absoluta, mas simbólica. 
`,
      creator: "Vera Araújo",
      content: "/assets/images/vera_araujo.png",
      contentType: "file",
      timestamp: new Date(2019, 5, 19).getTime(),
      views: 91,
    },
    {
      id: "chosen-picture-2",
      type: "picture",
      title: "Ellis Island in 1907",
      description:
        "How the Immigrants Who Came to Ellis Island in 1907 Compare to Arrivals Today",
      creator: "History",
      content: "/assets/chosen_image.avif",
      contentType: "file",
      timestamp: Date.now() - 86400000 * 5, // 5 days ago
      views: 91,
    },
    // Jornal - Hardcoded post with multiple images (Instagram-style carousel)
    {
      id: "jornal-post-1",
      type: "picture",
      title: "Estrangeiro - Jornal Literário",
      description:
        "Uma edição especial do jornal sobre a experiência de ser estrangeiro",
      creator: "SESLA - AAC",
      content: "/assets/jornal/thumbnail.jpg",
      contentType: "file",
      timestamp: Date.now(), // Now
      views: 12,
      // Special field for carousel images
      carouselImages: [
        "/assets/jornal/capa.jpg",
        "/assets/jornal/pagina_1.jpg",
        "/assets/jornal/pagina_2.jpg",
        "/assets/jornal/pagina_3.jpg",
        "/assets/jornal/pagina_4.jpg",
      ],
    },
  ];

  // Save to localStorage
  localStorage.setItem(
    "estrangeiro_submissions",
    JSON.stringify(sampleSubmissions),
  );
  console.log("Sample data initialized successfully!");
  console.log(`Added ${sampleSubmissions.length} sample submissions`);
})();
