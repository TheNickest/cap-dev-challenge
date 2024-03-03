using {sap.capire.bookshop as my} from '../db/schema';

annotate my.Authors with @PersonalData      : {
    DataSubjectRole: 'Author',
    EntitySemantics: 'DataSubject'
} {
    ID          @PersonalData.FieldSemantics: 'DataSubjectID';
    dateOfBirth @PersonalData.IsPotentiallySensitive;
    createdBy   @PersonalData.IsPotentiallyPersonal;
};
