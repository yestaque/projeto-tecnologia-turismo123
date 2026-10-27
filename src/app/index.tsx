
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from 'react-native';


const destinos = [
  {
    nome: 'Praia de Ponta Negra',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://www.vivepipa.com//data/imagenes/2018/11/15/533/1542288121-Praia_da_Ponta_Negra_20150814-DSC05653.JPG',
    descricao:
    'Uma das praias mais conhecidas de Natal, com vista para o Morro do Careca.',
  },
  {
    nome: 'Morro do Careca',
    cidade: 'Ponta Negra, Natal - RN',
    categoria: 'Praia',
    imagem: 'https://audiala.com/assets/images_cc/Q6914190/3_bald-hill-ponta-negra-beach-natal-brazil.jpg',
  },
  {
    nome: 'Praia dos Artistas',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://live.staticflickr.com/3570/3495846190_74ba83f64a_b.jpg',
  },
  {
    nome: 'Praia do Meio',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Praia_do_Meio_em_Natal.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },
  {
    nome: 'Praia de Areia Preta',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=700',
  },
  {
    nome: 'Dunas de Genipabu',
    cidade: 'Extremoz - RN',
    categoria: 'Aventura',
    imagem: 'https://live.staticflickr.com/8082/8307966565_fce1318345_b.jpg',
  },
  {
    nome: 'Parrachos de Maracajaú',
    cidade: 'Maxaranguape - RN',
    categoria: 'Natureza',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700',
  },
  {
    nome: 'Forte dos Reis Magos',
    cidade: 'Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Vista_do_Forte_dos_Reis_Magos.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },
  {
    nome: 'Parque das Dunas',
    cidade: 'Natal - RN',
    categoria: 'Natureza',
    imagem: 'https://noztour.com.br/wp-content/uploads/2026/10/Trilha-com-Arvore-Curvada-no-Parque-das-Dunas-em-Natal.jpg',
  },
  {
    nome: 'Parque da Cidade',
    cidade: 'Natal - RN',
    categoria: 'Natureza',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Parque_da_Cidade_do_Natal.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },
  {
    nome: 'Ponte Newton Navarro',
    cidade: 'Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Ponte_de_Natal_Newton_Navarro.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },
  {
    nome: 'Centro de Turismo',
    cidade: 'Petrópolis, Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Centro_de_Turismo_-_Natal_%28RN%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },
  {
    nome: 'Centro Histórico de Natal',
    cidade: 'Cidade Alta, Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://viagemeturismo.abril.com.br/wp-content/uploads/2025/08/Palacio_Potengi_Natal_20150922-DSC06020.jpg?quality=80&strip=info&w=720&crop=1',
  },
  {
    nome: 'Maior Cajueiro do Mundo',
    cidade: 'Pirangi, Parnamirim - RN',
    categoria: 'Natureza',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Pirangi_do_norte_-_o_maior_cajueiro_do_mundo_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },
  {
    nome: 'Praia de Pipa',
    cidade: 'Tibau do Sul - RN',
    categoria: 'Praia',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Praia_da_Pipa_-_Rio_Grande_do_Norte.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },
];



export default function HomeScreen() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);
  const [destinoSelecionado, setDestinoSelecionado] =
    useState<(typeof destinos)[number] | null>(null);

  const filtrados = destinos.filter((destino) => {
    const nomeCombina = destino.nome
      .toLowerCase()
      .includes(busca.trim().toLowerCase());

    const categoriaCombina =
      categoria === 'Todos' || destino.categoria === categoria;

    const favoritoCombina =
      !somenteFavoritos || favoritos.includes(destino.nome);

    return nomeCombina && categoriaCombina && favoritoCombina;
  });

  function alternarFavorito(nome: string) {
    setFavoritos((atuais) =>
      atuais.includes(nome)
        ? atuais.filter((item) => item !== nome)
        : [...atuais, nome]
    );
  }

  async function abrirMapa(
    destino: (typeof destinos)[number]
  ) {
    const endereco = encodeURIComponent(
      `${destino.nome}, ${destino.cidade}, Rio Grande do Norte, Brasil`
    );

    const url = `https://www.google.com/maps/search/?api=1&query=${endereco}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o mapa.');
    }
  }

  if (destinoSelecionado) {
    const destino = destinoSelecionado;
    const favorito = favoritos.includes(destino.nome);

    return (
      <ScrollView style={estilos.fundo}>
        <Pressable
          style={estilos.voltar}
          onPress={() => setDestinoSelecionado(null)}
        >
          <Text style={estilos.textoVoltar}>← Voltar aos destinos</Text>
        </Pressable>

        <Image
          source={{ uri: destino.imagem }}
          style={estilos.imagemDetalhe}
          resizeMode="cover"
        />

        <View style={estilos.informacoesDetalhe}>
          <Text style={estilos.nomeDetalhe}>{destino.nome}</Text>

          <Text style={estilos.cidade}>
            📍 {destino.cidade}
          </Text>

          <Text style={estilos.etiqueta}>
            {destino.categoria}
          </Text>

          <Text style={estilos.tituloDetalhe}>
            Sobre o destino
          </Text>

          <Text style={estilos.descricao}>
            {`Conheça ${destino.nome}, localizado em ${destino.cidade}. 
Consulte as informações turísticas locais antes da visita e planeje seu passeio pelo Rio Grande do Norte.`}
          </Text>

          <Pressable
            style={estilos.botaoMapa}
            onPress={() => abrirMapa(destino)}
          >
            <Text style={estilos.textoBotaoMapa}>
              📍 Abrir no Google Maps
            </Text>
          </Pressable>

          <Pressable
            style={estilos.botaoFavoritoDetalhe}
            onPress={() => alternarFavorito(destino.nome)}
          >
            <Text style={estilos.textoFavoritoDetalhe}>
              {favorito ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={estilos.fundo}>
      <View style={estilos.topo}>
        <Text style={estilos.logo}>BoraNatal 🌴</Text>
        <Text style={estilos.subtitulo}>
          Descubra as belezas do RN
        </Text>
      </View>

      <TextInput
        style={estilos.busca}
        placeholder="Buscar destino..."
        value={busca}
        onChangeText={setBusca}
      />

      <Pressable
        style={[
          estilos.botaoTodosFavoritos,
          somenteFavoritos && estilos.ativo,
        ]}
        onPress={() => setSomenteFavoritos(!somenteFavoritos)}
      >
        <Text
          style={[
            estilos.textoFavoritos,
            somenteFavoritos && estilos.textoAtivo,
          ]}
        >
          {somenteFavoritos
            ? '♥ Mostrando favoritos'
            : `♡ Meus favoritos (${favoritos.length})`}
        </Text>
      </Pressable>

      <Text style={estilos.titulo}>Categorias</Text>

      <View style={estilos.categorias}>
        {['Todos', 'Praia', 'Aventura', 'Natureza', 'Cultura'].map(
          (item) => (
            <Pressable
              key={item}
              style={[
                estilos.botaoCategoria,
                categoria === item && estilos.ativo,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  estilos.textoCategoria,
                  categoria === item && estilos.textoAtivo,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Text style={estilos.titulo}>Destinos para conhecer</Text>

      <Text style={estilos.contador}>
        {filtrados.length}{' '}
        {filtrados.length === 1
          ? 'destino encontrado'
          : 'destinos encontrados'}
      </Text>

      {filtrados.map((destino) => {
        const favorito = favoritos.includes(destino.nome);

        return (
          <View key={destino.nome} style={estilos.card}>
            <View style={estilos.areaImagem}>
              <Image
                source={{ uri: destino.imagem }}
                style={estilos.imagem}
                resizeMode="cover"
              />

              <Pressable
                style={estilos.botaoCoracao}
                onPress={() => alternarFavorito(destino.nome)}
                accessibilityRole="button"
                accessibilityLabel={
                  favorito
                    ? `Remover ${destino.nome} dos favoritos`
                    : `Adicionar ${destino.nome} aos favoritos`
                }
              >
                <Text style={estilos.coracao}>
                  {favorito ? '♥' : '♡'}
                </Text>
              </Pressable>
            </View>

            <View style={estilos.informacoes}>
              <Text style={estilos.nome}>{destino.nome}</Text>

              <Text style={estilos.cidade}>
                📍 {destino.cidade}
              </Text>

              <Text style={estilos.etiqueta}>
                {destino.categoria}
              </Text>

              <Pressable
                style={estilos.botaoDetalhes}
                onPress={() => setDestinoSelecionado(destino)}
              >
                <Text style={estilos.textoBotaoDetalhes}>
                  Ver detalhes →
                </Text>
              </Pressable>

              <Pressable
                style={estilos.linkMapa}
                onPress={() => abrirMapa(destino)}
              >
                <Text style={estilos.textoLinkMapa}>
                  📍 Ver localização no mapa
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}

      {filtrados.length === 0 && (
        <Text style={estilos.vazio}>
          {somenteFavoritos
            ? 'Você ainda não adicionou favoritos ou nenhum corresponde à busca.'
            : 'Nenhum destino encontrado.'}
        </Text>
      )}

      <Text style={estilos.rodape}>
        Feito para explorar o Rio Grande do Norte ☀️
      </Text>
    </ScrollView>
  );
}


const estilos = StyleSheet.create({

  
fundo: {
  flex: 1,
  backgroundColor: '#F4F8F5',
  paddingHorizontal: 18,
},

topo: {
  backgroundColor: '#076B57',
  padding: 24,
  borderRadius: 18,
  marginTop: 20,
  marginBottom: 20,
},

logo: {
  color: '#FFFFFF',
  fontSize: 30,
  fontWeight: 'bold',
},

subtitulo: {
  color: '#E0F2E9',
  fontSize: 16,
  marginTop: 6,
},

busca: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#DCE9E2',
  borderRadius: 12,
  padding: 14,
  fontSize: 16,
  marginBottom: 18,
},

titulo: {
  color: '#164A3C',
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 14,
},

categorias: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 24,
},

botaoCategoria: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#DCE9E2',
  borderRadius: 20,
  paddingVertical: 9,
  paddingHorizontal: 14,
},

ativo: {
  backgroundColor: '#076B57',
  borderColor: '#076B57',
},

textoCategoria: {
  color: '#076B57',
  fontWeight: '600',
},

textoAtivo: {
  color: '#FFFFFF',
},

card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  marginBottom: 20,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#E2EAE5',
},

imagem: {
  width: '100%',
  height: 210,
  backgroundColor: '#DCE9E2',
},

informacoes: {
  padding: 16,
},

nome: {
  color: '#164A3C',
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 8,
},

cidade: {
  color: '#64766E',
  fontSize: 14,
  marginBottom: 10,
},

etiqueta: {
  color: '#076B57',
  backgroundColor: '#E0F2E9',
  alignSelf: 'flex-start',
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 12,
  overflow: 'hidden',
  marginTop: 4,
},

vazio: {
  color: '#64766E',
  textAlign: 'center',
  padding: 24,
  fontSize: 16,
},

rodape: {
  color: '#64766E',
  textAlign: 'center',
  marginTop: 20,
  marginBottom: 35,
  fontSize: 14,
},  
  contador: {
    fontSize: 14,
    color: '#64766E',
    marginTop: -6,
    marginBottom: 16,
  },
  areaImagem: {
    position: 'relative',
  },
  botaoCoracao: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  coracao: {
    fontSize: 27,
    color: '#D62839',
  },
  botaoTodosFavoritos: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 12,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#DCE9E2',
    alignItems: 'center',
  },
  textoFavoritos: {
    color: '#076B57',
    fontWeight: 'bold',
  },
  botaoDetalhes: {
    backgroundColor: '#076B57',
    padding: 12,
    borderRadius: 10,
    marginTop: 14,
    alignItems: 'center',
  },
  textoBotaoDetalhes: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  linkMapa: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoLinkMapa: {
    color: '#076B57',
    fontWeight: '600',
  },
  voltar: {
    marginTop: 20,
    marginBottom: 15,
    padding: 10,
  },
  textoVoltar: {
    color: '#076B57',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagemDetalhe: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: '#DCE9E2',
  },
  informacoesDetalhe: {
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  nomeDetalhe: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#164A3C',
  },
  tituloDetalhe: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#164A3C',
    marginTop: 26,
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    lineHeight: 25,
    color: '#42574D',
  },
  botaoMapa: {
    backgroundColor: '#076B57',
    padding: 15,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  textoBotaoMapa: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoFavoritoDetalhe: {
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#076B57',
    alignItems: 'center',
  },
  textoFavoritoDetalhe: {
    color: '#076B57',
    fontWeight: 'bold',
  },
});
