enum SequenceType {
  'DNA' = 'dna',
  'RNA' = 'rna',
  'PROTEIN' = 'protein',
  'UNDEFINED' = 'undefined',
}

interface ISeqType {
  result: SequenceType;
}
