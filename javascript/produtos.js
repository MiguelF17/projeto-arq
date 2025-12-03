// ===============================
// 1. LISTA DE PRODUTOS
// ===============================
const produtos = [
    // -------- Sala de Estar / Quarto --------
    {
        id: 1,
        nome: "Sofá Cor Cinza Moderno",
        preco: 2129.99,
        categoria: "Sala de Estar",
        cor: "Cinza",
        material: "Tecido",
        imagem: "../style/imgs/sofacinza.png"
    },
    {
        id: 2,
        nome: "Poltronas Bege e Puff",
        preco: 1259.99,
        categoria: "Sala de Estar",
        cor: "Bege",
        material: "Tecido",
        imagem: "../style/imgs/poutronas.png",
    },
    {
        id: 3,
        nome: "Conjunto Cabeceiras",
        preco: 789.99,
        categoria: "Quarto",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/ccabeceiras.png"
    },
    {
        id: 4,
        nome: "Poltrona Bege Simples",
        preco: 569.99,
        categoria: "Sala de Estar",
        cor: "Bege",
        material: "Tecido",
        imagem: "../style/imgs/poltrona.png"
    },
    {
        id: 5,
        nome: "Cama Box Casal Moderna",
        preco: 3369.99,
        categoria: "Quarto",
        cor: "Bege",
        material: "Madeira",
        imagem: "../style/imgs/camacinza.png"
    },
    {
        id: 6,
        nome: "Poltrona Bege Atual",
        preco: 669.99,
        categoria: "Sala de Estar",
        cor: "Bege",
        material: "Tecido",
        imagem: "../style/imgs/poutrona2.png"
    },
    {
        id: 7,
        nome: "Lustre Luminária",
        preco: 839.99,
        categoria: "Decoração",
        cor: "Branco",
        material: "Vidro",
        imagem: "../style/imgs/luminaria.png"
    },
    {
        id: 8,
        nome: "Sofá Cinza Seccional",
        preco: 2339.99,
        categoria: "Sala de Estar",
        cor: "Cinza",
        material: "Tecido",
        imagem: "../style/imgs/sofa.png"
    },
    {
        id: 9,
        nome: "Cabeceira Murat Preta",
        preco: 669.99,
        categoria: "Quarto",
        cor: "Preto",
        material: "Couro Sintético",
        imagem: "../style/imgs/murrat.png"
    },

    // -------- Cozinha e Jantar --------
    {
        id: 10,
        nome: "Banco Chique Branco",
        preco: 429.99,
        categoria: "Sala de Jantar",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/banco.png"
    },
    {
        id: 11,
        nome: "Mesa de Janta Moderna",
        preco: 4599.99,
        categoria: "Sala de Jantar",
        cor: "Madeira Natural",
        material: "Madeira",
        imagem: "../style/imgs/mesa de janta.png"
    },
    {
        id: 12,
        nome: "Armário de Cozinha",
        preco: 749.99,
        categoria: "Cozinha",
        cor: "Bege",
        material: "Madeira",
        imagem: "../style/imgs/amário.png"
    },
    {
        id: 13,
        nome: "Panelas e Frigideiras",
        preco: 539.99,
        categoria: "Cozinha",
        cor: "Verde",
        material: "Alumínio",
        imagem: "../style/imgs/panelas2.webp"
    },
    {
        id: 14,
        nome: "Escorredor Moderno",
        preco: 159.99,
        categoria: "Cozinha",
        cor: "Preto",
        material: "Metal",
        imagem: "../style/imgs/escorredor3.jpeg"
    },
    {
        id: 15,
        nome: "Talheres Modernos",
        preco: 199.99,
        categoria: "Cozinha",
        cor: "Prata",
        material: "Metal",
        imagem: "../style/imgs/talheres2.png"
    },
    {
        id: 16,
        nome: "Pratos de Porcelana",
        preco: 349.99,
        categoria: "Cozinha",
        cor: "Branco",
        material: "Porcelana",
        imagem: "../style/imgs/pratos.png"
    },
    {
        id: 17,
        nome: "Conjunto de Utensílios",
        preco: 129.99,
        categoria: "Cozinha",
        cor: "Cinza",
        material: "Plástico",
        imagem: "../style/imgs/utencilios .png"
    },

    // -------- Banheiro --------
    {
        id: 18,
        nome: "Suporte para Toalhas",
        preco: 69.99,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Metal",
        imagem: "../style/imgs/suporte de toalhas.png"
    },
    {
        id: 19,
        nome: "Banqueira Moderna",
        preco: 129.99,
        categoria: "Banheiro",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/bamqueira.png"
    },
    {
        id: 20,
        nome: "Banheira Moderna",
        preco: 7899.99,
        categoria: "Banheiro",
        cor: "Branco",
        material: "Mármore",
        imagem: "../style/imgs/banheira.png"
    },
    {
        id: 21,
        nome: "Box Lateral Moderno",
        preco: 569.99,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Vidro",
        imagem: "../style/imgs/box.png"
    },
    {
        id: 22,
        nome: "Espelho Circular",
        preco: 339.99,
        categoria: "Banheiro",
        cor: "Marrom",
        material: "Vidro",
        imagem: "../style/imgs/espelho.png"
    },
    {
        id: 23,
        nome: "Pia Preta Moderna",
        preco: 219.99,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Mármore",
        imagem: "../style/imgs/pia.png"
    },
    {
        id: 24,
        nome: "Torneira Preta para Pia",
        preco: 389.99,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Aço Inox",
        imagem: "../style/imgs/torneira.png"
    },
    {
        id: 25,
        nome: "Gabinete de Pia",
        preco: 299.99,
        categoria: "Banheiro",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/gabinete.png"
    },
    {
        id: 26,
        nome: "Cristaleira de Madeira",
        preco: 1759.99,
        categoria: "Cozinha",
        cor: "Madeira Natural",
        material: "Madeira",
        imagem: "../style/imgs/cristaleira"
    },
    {
        id: 27,
        nome: "Mesa Menor para Jantar",
        preco: 1159.99,
        categoria: "Sala de Jantar",
        cor: "Marrom",
        material: "Madeira",
        imagem: "../style/imgs/mesa.menor"
    },
    {
        id: 28,
        nome: "Puff Banco",
        preco: 259.99,
        categoria: "Sala de Estar",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/puff1.jpg"
    },
    {
        id: 29,
        nome: "Puff FRAPÊ",
        preco: 189.99,
        categoria: "Sala de Estar",
        cor: "Grafite",
        material: "Veludo",
        imagem: "../style/imgs/pufffrappe.png"
    },
    {
        id: 30,
        nome: "Cadeira de Jantar",
        preco: 629.99,
        categoria: "Sala de Jantar",
        cor: "Marrom",
        material: "Madeira",
        imagem: "../style/imgs/cadeiradejanta.webp"
    },
    {
        id: 31,
        nome: "Gaveteiro Escritório",
        preco: 319.99,
        categoria: "Escritório & Home Office",
        cor: "Marrom",
        material: "Madeira",
        imagem: "../style/imgs/gaveteiro.png"
    },
    {
        id: 32,
        nome: "Mesa Boss Escritório",
        preco: 1599.99,
        categoria: "Escritório & Home Office",
        cor: "Bege",
        material: "Madeira",
        imagem: "../style/imgs/mesaBoss.png"
    },
    {
        id: 33,
        nome: "Luminária Cinza",
        preco: 339.99,
        categoria: "Decoração",
        cor: "Cinza",
        material: "Ferro",
        imagem: "../style/imgs/Luminaria2.png"
    },
    {
        id: 34,
        nome: "Cadeira de Escritório",
        preco: 1659.99,
        categoria: "Escritório & Home Office",
        cor: "Preto",
        material: "Aço Inox",
        imagem: "../style/imgs/poltronaEscritorio.avif"
    },
    {
        id: 35,
        nome: "Cadeira Profissional Rosé",
        preco: 1359.99,
        categoria: "Escritório & Home Office",
        cor: "Rosé / Cobre",
        material: "Plástico",
        imagem: "../style/imgs/poutrona3.jpg"
    },
    {
        id: 36,
        nome: "Armário Superior",
        preco: 479.99,
        categoria: "Cozinha",
        cor: "Cinza",
        material: "Madeira",
        imagem: "../style/imgs/armarioSuperior.png"
    },
    {
        id: 37,
        nome: "Cama casal FRIGGA",
        preco: 6999.99,
        categoria: "Quarto",
        cor: "Cinza",
        material: "Madeira",
        imagem: "../style/imgs/cama3.png"
    },
    {
        id: 38,
        nome: "Guarda roupa PULSE",
        preco: 1259.99,
        categoria: "Quarto",
        cor: "Cinza",
        material: "Madeira",
        imagem: "../style/imgs/guardaroupapulse.png"
    },
    {
        id: 39,
        nome: "Sofá RODEO 4 lugares",
        preco: 6679.99,
        categoria: "Sala de Estar",
        cor: "Off White",
        material: "Linho e Courino",
        imagem: "../style/imgs/sofarodeo.png"
    },
    {
        id: 40,
        nome: "Sofá PAMPA 4 lugares",
        preco: 6349.99,
        categoria: "Sala de Estar",
        cor: "Off White",
        material: "Linho",
        imagem: "../style/imgs/sofapampa.png"
    },
    {
        id: 41,
        nome: "Sofá HORSE 6 lugares",
        preco: 7559.99,
        categoria: "Sala de Estar",
        cor: "Off White",
        material: "Linho",
        imagem: "../style/imgs/sofahorse.png"
    },
    {
        id: 42,
        nome: "Rack ARQ",
        preco: 569.99,
        categoria: "Sala de Estar",
        cor: "Off White",
        material: "Madeira",
        imagem: "../style/imgs/rackarq.png"
    },
    {
        id: 43,
        nome: "Mesa JURERÊ + 8 cadeiras de jantar HIPICA",
        preco: 6679.99,
        categoria: "Sala de jantar",
        cor: "Off White",
        material: "Madeira e Linho",
        imagem: "../style/imgs/mesajurere.png"
    },
    {
        id: 44,
        nome: "Mesa VALÊNCIA",
        preco: 4579.99,
        categoria: "Sala de jantar",
        cor: "Cinza",
        material: "Madeira",
        imagem: "../style/imgs/mesavalencia.png"
    },
    {
        id: 45,
        nome: "Mesa NATURE",
        preco: 4259.99,
        categoria: "Sala de jantar",
        cor: "Cinza",
        material: "Madeira",
        imagem: "../style/imgs/mesanature.png"
    },
    {
        id: 46,
        nome: "Mesa DOMANN + 8 cadeiras",
        preco: 5639.99,
        categoria: "Sala de jantar",
        cor: "Cinza",
        material: "Madeira",
        imagem: "../style/imgs/mesavalencia.png"
    },
    {
        id: 47,
        nome: "Cadeira HIPICA",
        preco: 869.99,
        categoria: "Sala de jantar",
        cor: "Cinza",
        material: "Madeira E Linho",
        imagem: "../style/imgs/cadeirahipica.png"
    },
     {
        id: 48,
        nome: " 2 Cadeiras TERRACOTA",
        preco: 1699.99,
        categoria: "Sala de jantar",
        cor: "Off White",
        material: "Madeira e Linho",
        imagem: "../style/imgs/cadeiraterracota.png"
    },
    {
        id: 49,
        nome: "Cama PREMIUM",
        preco: 2579.99,
        categoria: "Quarto",
        cor: "Branca",
        material: "Madeira",
        imagem: "../style/imgs/camapremium.png"
    },
    {
        id: 50,
        nome: "Cama LAPA",
        preco: 1329.99,
        categoria: "Quarto",
        cor: "Off White",
        material: "Madeira e Estofado",
        imagem: "../style/imgs/camalapa.png"
    },
    {
        id: 52,
        nome: "Sofá AMENDOA",
        preco: 1159.99,
        categoria: "Sala de estar",
        cor: "Grafite",
        material: "Madeira e Linho",
        imagem: "../style/imgs/sofaamendoa.png"
    },
        {
        id: 53,
        nome: "Buffet LUNA",
        preco: 659.99,
        categoria: "Sala de jantar",
        cor: "Dourado",
        material: "Madeira e Linho",
        imagem: "../style/imgs/buffetluna.png"
    },
    {
        id: 53,
        nome: "Buffet LIA",
        preco: 1159.99,
        categoria: "Sala de jantar",
        cor: "Azul Petróleo",
        material: "Mdf",
        imagem: "../style/imgs/buffetlia.png"
    },




   
 ]
