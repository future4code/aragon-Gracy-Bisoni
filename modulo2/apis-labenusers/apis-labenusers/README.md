# LABENUSERS

Este exercício foi resolvido durante as aulas 26 (Integração de APIs)  e 27 (Funções Assíncronas) do curso Web Full Stack da Labenu. O propósito dele é construir um pequeno sistema de cadastro de usuários (frontend). Ele deve ser integrado com uma API já pronta, cuja documentação encontra-se abaixo:

[Labenusers](https://documenter.getpostman.com/view/7549981/SzfCT5G2?version=latest)

O projeto é composto por duas telas, a saber:

1. Tela de cadastro do usuário
    
    Esta tela deve solicita um email e um nome. Além disso, utiliza a requisição de criar o usuário da API. Tanto em erro como em sucesso, um `alert` é mostrado ao usuário.
    
2. Tela de lista de usuários
    
    Esta tela mostra uma lista de cards dos usuários com somente seus nomes.
    
    Cada item da lista possui um botão de deletar que realiza a requisição de **deletar** da API. Tanto em erro como em sucesso, um `alert` é mostrado ao usuário.