import {EntityMetadataMap} from "@ngrx/data";

// se avessi un applicazione con moduli in lazy loading, l'entity metadata sarebbe definito in ogni modulo.
// Sul costruttore dovrei iniettare EntityDefinitionService e chiamare registerMetadataMap passandogli l'entity metadata del modulo
const entityConfig: EntityMetadataMap = {
  User: {},
  Place: {},
  Absence: {},
  Notification: {},
  Report: {},
  Event: {}
}


export const getConfig = () => {
  return {
    entityMetadata: entityConfig,
    pluralNames: {
      User: 'Users',
      Place: 'Places',
      Absence: 'Absences',
      Notification: 'Notifications',
      Report: 'Reports',
      Event: 'Events'
    }
  }
}
