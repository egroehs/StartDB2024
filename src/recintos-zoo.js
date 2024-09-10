class RecintosZoo {
    constructor() {
        this.recintos = [
            { id: 1, bioma: 'savana', tamanho: 10, ocupacao: [{ especie: 'macaco', quantidade: 3, tamanho: 1 }], totalUsado: 3 },
            { id: 2, bioma: 'floresta', tamanho: 5, ocupacao: [], totalUsado: 0 },
            { id: 3, bioma: 'savana e rio', tamanho: 7, ocupacao: [{ especie: 'gazela', quantidade: 1, tamanho: 2 }], totalUsado: 2 },
            { id: 4, bioma: 'rio', tamanho: 8, ocupacao: [], totalUsado: 0 },
            { id: 5, bioma: 'savana', tamanho: 9, ocupacao: [{ especie: 'leao', quantidade: 1, tamanho: 3 }], totalUsado: 3 }
        ];

        this.animais = {
        leao: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        leopardo: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        crocodilo: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        macaco: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        gazela: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        hipopotamo: {
            tamanho: 4,
            biomas: ["savana", "rio"],
            carnivoro: false,
            toleraOutros: true,
            }
        };
    }

        analisaRecintos(animal, quantidade) {
          //Verificar se é um animal valido
          if (!this.animais[animal.toLowerCase()]) {
            return { erro: "Animal inválido", recintosViaveis: null};
          }

          //Verificar quantidade
          if (quantidade <= 0 || isNaN(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: null }
          }

          const infoAnimal = this.animais[animal.toLowerCase()];

          const recintosViaveis = [];

          this.recintos.forEach((recinto) => {
            const espacoRestante = recinto.tamanho - recinto.totalUsado;
            const espacoNecessario = infoAnimal.tamanho * quantidade;

            //Verificar se o bioma do recinto está incluído na lista de biomas onde o animal pode viver e se for savana ou rio, verifica se o animal pode viver em um ou outro
            if (
              infoAnimal.biomas.includes(recinto.bioma) ||
              (recinto.bioma === "savana e rio" && (infoAnimal.biomas.includes("savana") || infoAnimal.biomas.includes("rio"))))
             {
              //Verificar espacos
              if (espacoRestante >= espacoNecessario) {
                //Verifica se já há algum animal carnívoro no recinto
                const carnívorosPresentes = recinto.ocupacao.some(
                  (animal) => this.animais[animal.especie].carnivoro
                );
                //Verificando se o novo animal é carnívoro
                const isCarnivoro = infoAnimal.carnivoro;

                //Convivencia entre animais
                if (
                  (recinto.ocupacao.length === 0 && isCarnivoro) ||
                  (!isCarnivoro &&
                    (recinto.ocupacao.length === 0 || !carnívorosPresentes))
                ) {
                  let espacoLivre = espacoRestante - espacoNecessario;

                  // Ajustar espaço extra se houver mais de uma espécie
                  if (
                    recinto.ocupacao.length > 0 &&
                    !recinto.ocupacao.some(
                      (item) => item.especie === animal.toLowerCase()
                    )
                  ) {
                    espacoLivre -= 1;
                  }

                  recintosViaveis.push(
                    `Recinto ${recinto.id} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`
                  );
                }
              }
            }
          });

          // Retornar lista de recintos viáveis ou erro
          if (recintosViaveis.length > 0) {
            return { erro: null, recintosViaveis };
          } else {
            return { erro: "Não há recinto viável", recintosViaveis: null };
          }
        }
}


export { RecintosZoo as RecintosZoo };
