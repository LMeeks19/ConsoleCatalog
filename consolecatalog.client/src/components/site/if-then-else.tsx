function Conditional(props: ConditionalProps) {
  return props.Condition ? props.If : props.Else ?? "";
}

export default Conditional;

interface ConditionalProps {
  Condition: Boolean;
  If: any;
  Else?: any;
}
