export default function UserProfilePage({params}:any) {
    return (
        <div className="h-screen flex justify-center items-center">
            <h1 className="text-3xl">Profile <span className="bg-orange-500 p-2 rounded">{params.id} </span></h1>
        </div>
    )
}
