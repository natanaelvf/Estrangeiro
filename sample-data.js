// Sample data initialization script
// This adds placeholder content to demonstrate the website

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
      id: "sample-video-1",
      type: "video",
      title: "Immigration  Stories: Finding Home",
      description:
        'A short documentary exploring what "home" means to immigrants',
      creator: "Documentary Collective",
      content: "https://www.youtube.com/watch?v=J3Y00YJSKXY",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 3, // 3 days ago
      views: 67,
    },
    {
      id: "sample-video-2",
      type: "video",
      title: "Between Two Worlds",
      description: "Visual essay on the immigrant experience",
      creator: "Ana Rodriguez",
      content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 7, // 7 days ago
      views: 89,
    },
    {
      id: "sample-video-3",
      type: "video",
      title: "Voices of Displacement",
      description:
        "Interviews with people who feel like outsiders in their own communities",
      creator: "Community Media Project",
      content: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 4, // 4 days ago
      views: 53,
    },

    // Music submissions
    {
      id: "sample-music-1",
      type: "music",
      title: "Saudade",
      description:
        "A melancholic composition about longing for a place that no longer exists",
      creator: "Fado Novo",
      content: "https://www.youtube.com/watch?v=i7d0Lm_31BE",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 6, // 6 days ago
      views: 34,
    },
    {
      id: "sample-music-2",
      type: "music",
      title: "Immigrant Song (Cover)",
      description:
        "A reinterpretation from the perspective of modern displacement",
      creator: "The Wanderers",
      content: "https://www.youtube.com/watch?v=y8OtzJtp-EM",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 8, // 8 days ago
      views: 76,
    },
    {
      id: "sample-music-3",
      type: "music",
      title: "Entre Fronteiras",
      description: "Original song about living between borders",
      creator: "Coletivo Musical",
      content: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 2, // 2 days ago
      views: 45,
    },

    // Picture submissions
    {
      id: "sample-picture-1",
      type: "picture",
      title: "Empty Suitcase",
      description: "A photograph representing the weight of displacement",
      creator: "Lisa Chen",
      content:
        "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 5, // 5 days ago
      views: 91,
    },
    {
      id: "sample-picture-2",
      type: "picture",
      title: "Border Crossing",
      description: "Abstract representation of crossing invisible boundaries",
      creator: "Anonymous",
      content:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 9, // 9 days ago
      views: 102,
    },
    {
      id: "sample-picture-3",
      type: "picture",
      title: "Dual Identity",
      description: "Portrait exploring fragmented cultural identity",
      creator: "Marcus Williams",
      content:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 1, // 1 day ago
      views: 58,
    },
    {
      id: "sample-picture-4",
      type: "picture",
      title: "Raízes Deslocadas",
      description: "Uma árvore sem raízes, simbolizando o desenraizamento",
      creator: "Pedro Costa",
      content:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 3, // 3 days ago
      views: 73,
    },
    {
      id: "sample-picture-5",
      type: "picture",
      title: "Windows to Elsewhere",
      description: "Looking out from a new place, longing for another",
      creator: "Sarah Ahmed",
      content:
        "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800",
      contentType: "link",
      timestamp: Date.now() - 86400000 * 6, // 6 days ago
      views: 65,
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
