export default function Restaurant({params}: {params:{id: string}}) {
  return <div style={{paddingTop:'120px'}}><h1>{`Restaurant ${params.id}`}</h1></div>;
}
