export default function Jumbotron({title, subtitle= "Welcome to React E-commerce"}){
    return (
        <div className="container-fluid jumbotron">
        <div class="row">
        <div class="col text-center p-5">
        <h1 className="fw-bold">{title}</h1>
        <p class="lead">{subtitle}</p>
        </div>
        </div>
        </div>
    )
}