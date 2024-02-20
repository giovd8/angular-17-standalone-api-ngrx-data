import {EntityMetadataMap} from "@ngrx/data";

// se avessi un applicazione con moduli in lazy loading, l'entity metadata sarebbe definito in ogni modulo.
// Sul costruttore dovrei iniettare EntityDefinitionService e chiamare registerMetadataMap passandogli l'entity metadata del modulo
// in questo caso è definito nel file app.config.ts
const entityConfig: EntityMetadataMap = {
  User: {
    sortComparer: (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name),
    entityDispatcherOptions: {
      // con optimisticUpdate ngrx data fa l'update e in locale e poi fa la chiamata al server
      // per la delete di default è false quindi prima fa la chiamata al server e poi elimina in locale
      optimisticUpdate: true,
      // per la delete di default è false
      optimisticDelete: false
    }
  },
}


export const getConfig = () => {
  return {
    entityMetadata: entityConfig,
    // non sono necessari in quanto in automatico ngrx data li deduce dal nome delle entità e aggiunge una s al plurale, è solo d'esempio
    pluralNames: {
      User: 'Users',
    }
  }
}
