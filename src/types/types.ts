export type PokemonName = {
    english?: string;
    german?: string;
    japanese?: string;
};

export type PokemonDataResponse = {
    number: number;
    translated: string;
    image: string;
    error?: string;
};

export type SpeciesNames = {
    names: { language: { name: string }; name: string }[];
};

export type Pokemon = {
    number: number;
    name: string;
};

export type Region = {
    name: string;
    start: number;
    end: number;
};

export type PokemonCardData = {
    number: number;
    name: PokemonName;
    image: string;
};

export type PokeAPIResult = {
    name: string;
    url: string;
};

export type PokeAPIPokemon = {
    id: number;
    name: string;
    abilities: { ability: { name: string; url: string } }[];
    cries: { latest: string; previous: string };
    forms: { name: string; url: string }[];
    types: { type: { name: string; url: string } }[];
    image: string;
    species: {
        name: string;
        url: string;
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    height: number;
    weight: number;
    sprites: {
        back_default: string;
        front_default: string;
        front_shiny: string;
        back_shiny: string;
    };
};

export type PokeApiPokemonSpecies = {
    id: string;
    name: string;
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
        version: {
            name: string;
            url: string;
        };
    }[];
};

export type APIResponseError = {
    number: number;
    translated: string;
    image: string;
};
