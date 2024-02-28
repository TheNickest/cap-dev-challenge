using {sap.capire.bookshop as my} from '../db/schema';

annotate my.Books with @PersonalData      : {
    DataSubjectRole: 'Author',
    EntitySemantics: 'DataSubject'
} {
    ID        @PersonalData.FieldSemantics: 'DataSubjectID';
    author    @PersonalData.IsPotentiallyPersonal;
    createdBy @PersonalData.IsPotentiallyPersonal;
};
