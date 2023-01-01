export default function Jumbotron({title, subtitle= "Welcome to KJT Bookshop"}){
    return (
        <div className="container-fluid jumbotron" style={{ marginTop: "-8px", height: "200px"}} >
        <div class="row">
        <div class="col text-center p-5">
        <h1 className="fw-bold">{title}</h1>
        <p class="lead">{subtitle}</p>
        </div>
        </div>
        </div>
    )
}