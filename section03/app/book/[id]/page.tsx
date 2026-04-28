export default async function Page({params} : {
    params : Promise<{id : string}>
}) {
    const {id} = await params;
    console.log(id);

    return <div>book page : {id}</div>;
}