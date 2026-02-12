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
    // Text submissions
    {
      id: "sample-text-1",
      type: "text",
      title: "Invisible Borders",
      description: "A poem about feeling foreign in your own homeland",
      creator: "Maria Santos",
      content: `I walk these streets I've known since birth,
Yet somehow they don't recognize me back.
The language sits heavy on my tongue,
Foreign in a place that should be home.

They look at me and see a stranger,
Though I've lived here all my life.
The borders aren't drawn on maps,
They're etched in sideways glances,
In questions about where I'm "really" from.

I am foreign not by choice,
But by the lens through which they see.
My passport says I belong,
But their eyes tell a different story.`,
      contentType: "text",
      timestamp: Date.now() - 86400000 * 2, // 2 days ago
      views: 24,
    },
    {
      id: "sample-text-2",
      type: "text",
      title: "The Language of Displacement",
      description: "An essay on the experience of cultural displacement",
      creator: "Anonymous",
      content: `To be foreign is to exist in translation. Every interaction becomes a careful negotiation between who you are and who they expect you to be. You learn to code-switch, not just languages, but entire identities.

You become fluent in the art of explanation, always ready with the story of how you got here, why you speak the way you do, why you celebrate different holidays. Your life becomes a museum exhibit, open for inspection.

But perhaps the cruelest part is when you return "home" and find yourself foreign there too. The accent has shifted, the references don't land, and you realize you've become a bridge between two worlds, fully belonging to neither.`,
      contentType: "text",
      timestamp: Date.now() - 86400000 * 5, // 5 days ago
      views: 42,
    },
    {
      id: "sample-text-3",
      type: "text",
      title: "Fragmentos de Identidade",
      description: "Reflexões sobre identidade fragmentada entre culturas",
      creator: "João Silva",
      content: `Sou um mosaico de lugares que nunca foram completamente meus. Cada peça reflete um momento, uma língua, uma versão de mim que existiu em um espaço específico.

Há dias em que acordo e não reconheço minha própria voz no espelho. Ela carrega sotaques de três continentes, memórias de quatro casas, saudades de pessoas que talvez nunca entenderam quem eu realmente sou.

Ser estrangeiro não é apenas cruzar fronteiras geográficas. É viver na fronteira entre identidades, línguas, expectativas. É ser sempre "aquele que veio de fora", mesmo quando não há um "dentro" para chamar de seu.`,
      contentType: "text",
      timestamp: Date.now() - 86400000 * 1, // 1 day ago
      views: 18,
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
