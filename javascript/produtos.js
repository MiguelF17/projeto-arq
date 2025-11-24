// ===============================
// 1. LISTA DE PRODUTOS
// ===============================
const produtos = [
    // -------- Sala de Estar / Quarto --------
    {
        id: 1,
        nome: "Sofá Cor Cinza Moderno",
        preco: 2120.55,
        categoria: "Sala de Estar",
        cor: "Cinza",
        material: "Tecido",
        imagem: "../style/imgs/sofacinza.png"
    },
    {
        id: 2,
        nome: "Poltronas Bege e Puff",
        preco: 576.79,
        categoria: "Sala de Estar",
        cor: "Bege",
        material: "Tecido",
        imagem: "../style/imgs/poutronas.png"
    },
    {
        id: 3,
        nome: "Conjunto Cabeceiras",
        preco: 242.45,
        categoria: "Quarto",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/ccabeceiras.png"
    },
    {
        id: 4,
        nome: "Poltrona Bege Simples",
        preco: 562.32,
        categoria: "Sala de Estar",
        cor: "Bege",
        material: "Tecido",
        imagem: "../style/imgs/poltrona.png"
    },
    {
        id: 5,
        nome: "Cama Bege Moderna",
        preco: 2360.79,
        categoria: "Quarto",
        cor: "Bege",
        material: "Madeira",
        imagem: "../style/imgs/camacinza.png"
    },
    {
        id: 6,
        nome: "Poltrona Bege Atual",
        preco: 662.32,
        categoria: "Sala de Estar",
        cor: "Bege",
        material: "Tecido",
        imagem: "../style/imgs/poutrona2.png"
    },
    {
        id: 7,
        nome: "Lustre Luminária",
        preco: 835.36,
        categoria: "Decoração",
        cor: "Branco",
        material: "Vidro",
        imagem: "../style/imgs/luminaria.png"
    },
    {
        id: 8,
        nome: "Sofá Cinza Seccional",
        preco: 1002.02,
        categoria: "Sala de Estar",
        cor: "Cinza",
        material: "Tecido",
        imagem: "../style/imgs/sofa.png"
    },
    {
        id: 9,
        nome: "Cabeceira Murat Preta",
        preco: 662.32,
        categoria: "Quarto",
        cor: "Preto",
        material: "Couro Sintético",
        imagem: "../style/imgs/murrat.png"
    },

    // -------- Cozinha e Jantar --------
    {
        id: 10,
        nome: "Banco Chique Branco",
        preco: 420.55,
        categoria: "Sala de Jantar",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/banco.png"
    },
    {
        id: 11,
        nome: "Mesa de Janta Moderna",
        preco: 976.79,
        categoria: "Sala de Jantar",
        cor: "Madeira Natural",
        material: "Madeira",
        imagem: "../style/imgs/mesa de janta.png"
    },
    {
        id: 12,
        nome: "Armário de Cozinha",
        preco: 742.45,
        categoria: "Cozinha",
        cor: "Bege",
        material: "Madeira",
        imagem: "../style/imgs/amário.png"
    },
    {
        id: 13,
        nome: "Panelas e Frigideiras",
        preco: 642.12,
        categoria: "Cozinha",
        cor: "Verde",
        material: "Alumínio",
        imagem: "../style/imgs/panelas.png"
    },
    {
        id: 14,
        nome: "Escorredor Moderno",
        preco: 159.99,
        categoria: "Cozinha",
        cor: "Preto",
        material: "Metal",
        imagem: "../style/imgs/escorredor.png"
    },
    {
        id: 15,
        nome: "Talheres Modernos",
        preco: 32.32,
        categoria: "Cozinha",
        cor: "Prata",
        material: "Metal",
        imagem: "../style/imgs/talheres.png"
    },
    {
        id: 16,
        nome: "Pratos de Porcelana",
        preco: 135.36,
        categoria: "Cozinha",
        cor: "Branco",
        material: "Porcelana",
        imagem: "../style/imgs/pratos.png"
    },
    {
        id: 17,
        nome: "Conjunto de Utensílios",
        preco: 32.32,
        categoria: "Cozinha",
        cor: "Cinza",
        material: "Plástico",
        imagem: "../style/imgs/utencilios .png"
    },

    // -------- Banheiro --------
    {
        id: 18,
        nome: "Suporte para Toalhas",
        preco: 35.55,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Metal",
        imagem: "../style/imgs/suporte de toalhas.png"
    },
    {
        id: 19,
        nome: "Banqueira Moderna",
        preco: 46.79,
        categoria: "Banheiro",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/bamqueira.png"
    },
    {
        id: 20,
        nome: "Banheira Moderna",
        preco: 842.45,
        categoria: "Banheiro",
        cor: "Branco",
        material: "Mármore",
        imagem: "../style/imgs/banheira.png"
    },
    {
        id: 21,
        nome: "Box Lateral Moderno",
        preco: 562.32,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Vidro",
        imagem: "../style/imgs/box.png"
    },
    {
        id: 22,
        nome: "Espelho Circular",
        preco: 60.79,
        categoria: "Banheiro",
        cor: "Marrom",
        material: "Vidro",
        imagem: "../style/imgs/espelho.png"
    },
    {
        id: 23,
        nome: "Pia Preta Moderna",
        preco: 74.32,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Mármore",
        imagem: "../style/imgs/pia.png"
    },
    {
        id: 24,
        nome: "Torneira Preta para Pia",
        preco: 28.36,
        categoria: "Banheiro",
        cor: "Preto",
        material: "Aço Inox",
        imagem: "../style/imgs/torneira.png"
    },
    {
        id: 25,
        nome: "Gabinete de Pia",
        preco: 52.32,
        categoria: "Banheiro",
        cor: "Branco",
        material: "Madeira",
        imagem: "../style/imgs/gabinete.png"
    }
];
