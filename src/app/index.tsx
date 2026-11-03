import React, { useEffect, useMemo, useState } from 'react';
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
  Share,
  ActivityIndicator,
} from 'react-native';

type Destino = {
  nome: string;
  cidade: string;
  categoria: string;
  imagem: string;
  descricao: string;
  latitude: number;
  longitude: number;
};

type Avaliacao = {
  nota: number;
  comentario: string;
};

type Clima = {
  temperatura: number;
  vento: number;
};

const destinos: Destino[] = [
  {
    nome: 'Praia de Ponta Negra',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://www.vivepipa.com//data/imagenes/2018/11/15/533/1542288121-Praia_da_Ponta_Negra_20150814-DSC05653.JPG',
    descricao: 'Uma das praias mais conhecidas de Natal, com vista para o Morro do Careca.',
    latitude: -5.8833,
    longitude: -35.176,
  },
  {
    nome: 'Morro do Careca',
    cidade: 'Ponta Negra, Natal - RN',
    categoria: 'Praia',
    imagem: 'https://audiala.com/assets/images_cc/Q6914190/3_bald-hill-ponta-negra-beach-natal-brazil.jpg',
    descricao: 'Duna icônica que compõe a paisagem de Ponta Negra. A subida é proibida para preservação ambiental.',
    latitude: -5.888,
    longitude: -35.161,
  },
  {
    nome: 'Praia dos Artistas',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://live.staticflickr.com/3570/3495846190_74ba83f64a_b.jpg',
    descricao: 'Praia urbana próxima à região central de Natal.',
    latitude: -5.779,
    longitude: -35.195,
  },
  {
    nome: 'Praia do Meio',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Praia_do_Meio_em_Natal.jpg',
    descricao: 'Praia urbana da zona Leste de Natal.',
    latitude: -5.778,
    longitude: -35.19,
  },
  {
    nome: 'Praia de Areia Preta',
    cidade: 'Natal - RN',
    categoria: 'Praia',
    imagem: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=700',
    descricao: 'Trecho de litoral urbano conhecido pelas falésias e pelo calçadão.',
    latitude: -5.785,
    longitude: -35.19,
  },
  {
    nome: 'Dunas de Genipabu',
    cidade: 'Extremoz - RN',
    categoria: 'Aventura',
    imagem: 'https://live.staticflickr.com/8082/8307966565_fce1318345_b.jpg',
    descricao: 'Complexo de dunas conhecido pelos passeios de buggy e paisagens naturais.',
    latitude: -5.68,
    longitude: -35.2,
  },
  {
    nome: 'Parrachos de Maracajaú',
    cidade: 'Maxaranguape - RN',
    categoria: 'Natureza',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700',
    descricao: 'Piscinas naturais procuradas para mergulho e observação da vida marinha. Consulte maré e condições do passeio.',
    latitude: -5.35,
    longitude: -35.25,
  },
  {
    nome: 'Forte dos Reis Magos',
    cidade: 'Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Vista_do_Forte_dos_Reis_Magos.jpg',
    descricao: 'Fortificação histórica localizada na foz do Rio Potengi.',
    latitude: -5.759,
    longitude: -35.199,
  },
  {
    nome: 'Parque das Dunas',
    cidade: 'Natal - RN',
    categoria: 'Natureza',
    imagem: 'https://noztour.com.br/wp-content/uploads/2026/10/Trilha-com-Arvore-Curvada-no-Parque-das-Dunas-em-Natal.jpg',
    descricao: 'Área de preservação ambiental com trilhas e contato com a natureza. Verifique regras e horários antes da visita.',
    latitude: -5.826,
    longitude: -35.198,
  },
  {
    nome: 'Parque da Cidade',
    cidade: 'Natal - RN',
    categoria: 'Natureza',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Parque_da_Cidade_do_Natal.jpg',
    descricao: 'Parque urbano com área verde e espaços para contemplação.',
    latitude: -5.84,
    longitude: -35.22,
  },
  {
    nome: 'Ponte Newton Navarro',
    cidade: 'Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Ponte_de_Natal_Newton_Navarro.jpg',
    descricao: 'Ponte estaiada que conecta regiões da cidade e oferece uma paisagem marcante da área portuária.',
    latitude: -5.765,
    longitude: -35.2,
  },
  {
    nome: 'Centro de Turismo',
    cidade: 'Petrópolis, Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Centro_de_Turismo_-_Natal_%28RN%29.jpg',
    descricao: 'Espaço instalado em edifício histórico, com lojas de artesanato e produtos regionais.',
    latitude: -5.79,
    longitude: -35.202,
  },
  {
    nome: 'Centro Histórico de Natal',
    cidade: 'Cidade Alta, Natal - RN',
    categoria: 'Cultura',
    imagem: 'https://viagemeturismo.abril.com.br/wp-content/uploads/2025/08/Palacio_Potengi_Natal_20150922-DSC06020.jpg?quality=80&strip=info&w=720&crop=1',
    descricao: 'Região com construções históricas e espaços culturais. Planeje o percurso e confira os horários de visitação.',
    latitude: -5.79,
    longitude: -35.21,
  },
  {
    nome: 'Maior Cajueiro do Mundo',
    cidade: 'Pirangi, Parnamirim - RN',
    categoria: 'Natureza',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Pirangi_do_norte_-_o_maior_cajueiro_do_mundo_-_panoramio.jpg',
    descricao: 'Grande árvore situada em Pirangi, conhecida por sua extensa copa.',
    latitude: -5.96,
    longitude: -35.133,
  },
  {
    nome: 'Praia de Pipa',
    cidade: 'Tibau do Sul - RN',
    categoria: 'Praia',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Praia_da_Pipa_-_Rio_Grande_do_Norte.jpg',
    descricao: 'Destino turístico conhecido pelas falésias, praias e paisagens do litoral sul potiguar.',
    latitude: -6.23,
    longitude: -35.05,
  },
  {
    nome: 'Gastronomia em Ponta Negra',
    cidade: 'Ponta Negra, Natal - RN',
    categoria: 'Gastronomia',
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900',
    descricao: 'Explore restaurantes, cafés e opções de comida regional na região de Ponta Negra.',
    latitude: -5.8833,
    longitude: -35.176,
  },
  {
    nome: 'Hotéis da Via Costeira',
    cidade: 'Via Costeira, Natal - RN',
    categoria: 'Hospedagem',
    imagem: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900',
    descricao: 'Pesquise opções de hospedagem ao longo da Via Costeira e compare localização, serviços e preços.',
    latitude: -5.84,
    longitude: -35.19,
  },
];

const categorias = [
  'Todos',
  'Praia',
  'Aventura',
  'Natureza',
  'Cultura',
  'Gastronomia',
  'Hospedagem',
];

export default function HomeScreen() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);
  const [destinoSelecionado, setDestinoSelecionado] = useState<Destino | null>(null);
  const [roteiro, setRoteiro] = useState<string[]>([]);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [avaliacoes, setAvaliacoes] = useState<Record<string, Avaliacao[]>>({});
  const [clima, setClima] = useState<Clima | null>(null);
  const [carregandoClima, setCarregandoClima] = useState(false);
  const [erroClima, setErroClima] = useState('');

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return destinos.filter((destino) => {
      const textoDestino =
        `${destino.nome} ${destino.cidade} ${destino.categoria} ${destino.descricao}`.toLowerCase();
      const combinaBusca = !termo || textoDestino.includes(termo);
      const combinaCategoria =
        categoria === 'Todos' || destino.categoria === categoria;
      const combinaFavorito =
        !somenteFavoritos || favoritos.includes(destino.nome);

      return combinaBusca && combinaCategoria && combinaFavorito;
    });
  }, [busca, categoria, favoritos, somenteFavoritos]);

  useEffect(() => {
    if (!destinoSelecionado) {
      setClima(null);
      setErroClima('');
      setCarregandoClima(false);
      return;
    }

    let ativo = true;

    async function consultarClima() {
      setCarregandoClima(true);
      setClima(null);
      setErroClima('');

      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${destinoSelecionado!.latitude}` +
        `&longitude=${destinoSelecionado!.longitude}` +
        '&current=temperature_2m,wind_speed_10m&timezone=America%2FFortaleza';

      try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
          throw new Error('Falha na consulta do clima.');
        }

        const dados = await resposta.json();
        if (ativo && dados.current) {
          setClima({
            temperatura: dados.current.temperature_2m,
            vento: dados.current.wind_speed_10m,
          });
        } else if (ativo) {
          setErroClima('Dados do clima indisponíveis no momento.');
        }
      } catch {
        if (ativo) {
          setErroClima('Não foi possível consultar o clima. Verifique sua conexão.');
        }
      } finally {
        if (ativo) setCarregandoClima(false);
      }
    }

    consultarClima();

    return () => {
      ativo = false;
    };
  }, [destinoSelecionado]);

  function alternarFavorito(nome: string) {
    setFavoritos((atuais) =>
      atuais.includes(nome)
        ? atuais.filter((item) => item !== nome)
        : [...atuais, nome],
    );
  }

  function alternarRoteiro(nome: string) {
    setRoteiro((atual) =>
      atual.includes(nome)
        ? atual.filter((item) => item !== nome)
        : [...atual, nome],
    );
  }

  async function abrirMapa(destino: Destino) {
    const endereco = encodeURIComponent(
      `${destino.nome}, ${destino.cidade}, Rio Grande do Norte, Brasil`,
    );
    const url = `https://www.google.com/maps/search/?api=1&query=${endereco}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o mapa.');
    }
  }

  async function compartilhar(destino: Destino) {
    try {
      await Share.share({
        message: `Conheça ${destino.nome}, em ${destino.cidade}! Planeje sua visita com o BoraNatal.`,
      });
    } catch {
      Alert.alert('Erro', 'Não foi possível compartilhar este destino.');
    }
  }

  function salvarAvaliacao() {
    if (!destinoSelecionado) return;

    if (!comentario.trim()) {
      Alert.alert('Comentário', 'Escreva um comentário antes de enviar.');
      return;
    }

    setAvaliacoes((atuais) => ({
      ...atuais,
      [destinoSelecionado.nome]: [
        ...(atuais[destinoSelecionado.nome] || []),
        { nota, comentario: comentario.trim() },
      ],
    }));

    setComentario('');
    setNota(5);
    Alert.alert('Avaliação adicionada', 'A avaliação foi registrada nesta sessão.');
  }

  function mostrarRoteiro() {
    if (roteiro.length === 0) {
      Alert.alert('Meu roteiro', 'Adicione destinos ao roteiro pelos detalhes.');
      return;
    }

    Alert.alert(
      'Meu roteiro',
      roteiro.map((nome, indice) => `${indice + 1}. ${nome}`).join('\n'),
    );
  }

  const botao = (
    texto: string,
    acao: () => void,
    secundario = false,
  ) => (
    <Pressable
      style={[estilos.botao, secundario && estilos.botaoSecundario]}
      onPress={acao}
    >
      <Text
        style={[
          estilos.textoBotao,
          secundario && estilos.textoBotaoSecundario,
        ]}
      >
        {texto}
      </Text>
    </Pressable>
  );

  if (destinoSelecionado) {
    const destino = destinoSelecionado;
    const listaAvaliacoes = avaliacoes[destino.nome] || [];
    const estaNoRoteiro = roteiro.includes(destino.nome);
    const estaFavorito = favoritos.includes(destino.nome);

    return (
      <ScrollView
        style={estilos.fundo}
        contentContainerStyle={estilos.conteudo}
      >
        <Pressable
          onPress={() => setDestinoSelecionado(null)}
          style={estilos.voltar}
        >
          <Text style={estilos.textoVoltar}>← Voltar aos destinos</Text>
        </Pressable>

        <Image
          source={{ uri: destino.imagem }}
          style={estilos.imagemDetalhe}
          resizeMode="cover"
        />

        <Text style={estilos.nomeDetalhe}>{destino.nome}</Text>
        <Text style={estilos.cidade}>📍 {destino.cidade}</Text>
        <Text style={estilos.etiqueta}>{destino.categoria}</Text>

        <Text style={estilos.tituloSecao}>Sobre o destino</Text>
        <Text style={estilos.descricao}>{destino.descricao}</Text>

        <Text style={estilos.tituloSecao}>☀️ Clima agora</Text>
        {carregandoClima ? (
          <ActivityIndicator color="#076B57" />
        ) : clima ? (
          <Text style={estilos.descricao}>
            {clima.temperatura} °C · Vento: {clima.vento} km/h
          </Text>
        ) : (
          <Text style={estilos.descricao}>
            {erroClima || 'Consulte o clima conectando-se à internet.'}
          </Text>
        )}

        <Text style={estilos.tituloSecao}>Planeje sua visita</Text>
        <Text style={estilos.descricao}>
          Horários, preços e condições podem mudar. Confirme as informações
          com o estabelecimento ou órgão responsável antes da visita.
        </Text>

        {botao(
          estaNoRoteiro
            ? '✓ Remover do meu roteiro'
            : '+ Adicionar ao meu roteiro',
          () => alternarRoteiro(destino.nome),
          true,
        )}
        {botao('📍 Abrir no Google Maps', () => abrirMapa(destino))}
        {botao('Compartilhar destino', () => compartilhar(destino), true)}
        {botao(
          estaFavorito ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos',
          () => alternarFavorito(destino.nome),
          true,
        )}

        <Text style={estilos.tituloSecao}>⭐ Avalie este destino</Text>
        <View style={estilos.linhaNotas}>
          {[1, 2, 3, 4, 5].map((valor) => (
            <Pressable key={valor} onPress={() => setNota(valor)}>
              <Text style={estilos.estrela}>
                {valor <= nota ? '★' : '☆'}
              </Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={[estilos.busca, estilos.caixaComentario]}
          placeholder="Conte como foi sua experiência..."
          value={comentario}
          onChangeText={setComentario}
          multiline
        />
        {botao('Enviar avaliação', salvarAvaliacao)}

        <Text style={estilos.tituloSecao}>
          Comentários ({listaAvaliacoes.length})
        </Text>
        {listaAvaliacoes.length === 0 ? (
          <Text style={estilos.descricao}>
            Ainda não há comentários nesta sessão.
          </Text>
        ) : (
          listaAvaliacoes.map((avaliacao, indice) => (
            <View
              key={`${destino.nome}-${indice}`}
              style={estilos.comentarioCard}
            >
              <Text style={estilos.textoNota}>
                {'★'.repeat(avaliacao.nota)}
                {'☆'.repeat(5 - avaliacao.nota)}
              </Text>
              <Text style={estilos.descricao}>
                {avaliacao.comentario}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={estilos.fundo}
      contentContainerStyle={estilos.conteudo}
    >
      <View style={estilos.topo}>
        <Text style={estilos.logo}>BoraNatal 🌴</Text>
        <Text style={estilos.subtitulo}>
          Descubra as belezas do Rio Grande do Norte
        </Text>
      </View>

      <TextInput
        style={estilos.busca}
        placeholder="Buscar por destino, cidade ou categoria..."
        value={busca}
        onChangeText={setBusca}
      />

      <View style={estilos.linhaBotoes}>
        <Pressable
          style={[
            estilos.filtroFavoritos,
            somenteFavoritos && estilos.ativo,
          ]}
          onPress={() => setSomenteFavoritos((valor) => !valor)}
        >
          <Text
            style={[
              estilos.textoFiltro,
              somenteFavoritos && estilos.textoAtivo,
            ]}
          >
            {somenteFavoritos
              ? '♥ Ver todos'
              : `♡ Favoritos (${favoritos.length})`}
          </Text>
        </Pressable>

        <Pressable style={estilos.filtroFavoritos} onPress={mostrarRoteiro}>
          <Text style={estilos.textoFiltro}>
            🧭 Meu roteiro ({roteiro.length})
          </Text>
        </Pressable>
      </View>

      <Text style={estilos.titulo}>Categorias</Text>
      <View style={estilos.categorias}>
        {categorias.map((item) => (
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
        ))}
      </View>

      <Text style={estilos.titulo}>Destinos para conhecer</Text>
      <Text style={estilos.contador}>
        {filtrados.length} resultado(s)
      </Text>

      {filtrados.map((destino) => {
        const favorito = favoritos.includes(destino.nome);
        const noRoteiro = roteiro.includes(destino.nome);

        return (
          <View key={destino.nome} style={estilos.card}>
            <View style={estilos.areaImagem}>
              <Image
                source={{ uri: destino.imagem }}
                style={estilos.imagem}
                resizeMode="cover"
              />
              <Pressable
                style={estilos.coracaoBotao}
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
              <Text style={estilos.cidade}>📍 {destino.cidade}</Text>
              <Text style={estilos.etiqueta}>{destino.categoria}</Text>

              {botao('Ver detalhes →', () => setDestinoSelecionado(destino))}
              {botao(
                noRoteiro ? '✓ No meu roteiro' : '+ Adicionar ao roteiro',
                () => alternarRoteiro(destino.nome),
                true,
              )}
            </View>
          </View>
        );
      })}

      {filtrados.length === 0 && (
        <Text style={estilos.vazio}>
          Nenhum destino encontrado. Tente outra busca ou categoria.
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
  },
  conteudo: {
    paddingHorizontal: 18,
    paddingBottom: 35,
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
    marginBottom: 15,
    color: '#164A3C',
  },
  titulo: {
    color: '#164A3C',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 14,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 22,
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
  areaImagem: {
    position: 'relative',
  },
  imagem: {
    width: '100%',
    height: 210,
    backgroundColor: '#DCE9E2',
  },
  coracaoBotao: {
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
  botao: {
    backgroundColor: '#076B57',
    padding: 13,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botaoSecundario: {
    backgroundColor: '#E0F2E9',
    borderWidth: 1,
    borderColor: '#076B57',
  },
  textoBotaoSecundario: {
    color: '#076B57',
  },
  linhaBotoes: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filtroFavoritos: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE9E2',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoFiltro: {
    color: '#076B57',
    fontWeight: 'bold',
  },
  contador: {
    color: '#64766E',
    marginBottom: 14,
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
    fontSize: 14,
  },
  voltar: {
    marginTop: 18,
    marginBottom: 15,
    padding: 8,
  },
  textoVoltar: {
    color: '#076B57',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagemDetalhe: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    backgroundColor: '#DCE9E2',
  },
  nomeDetalhe: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#164A3C',
    marginTop: 18,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#164A3C',
    marginTop: 24,
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    lineHeight: 25,
    color: '#42574D',
  },
  linhaNotas: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  estrela: {
    fontSize: 34,
    color: '#E6A700',
  },
  caixaComentario: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  comentarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 13,
    marginTop: 10,
  },
  textoNota: {
    color: '#E6A700',
    fontSize: 18,
    marginBottom: 5,
  },
});
