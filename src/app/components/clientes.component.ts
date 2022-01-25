import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

 
  titulo = 'Agregar Cliente';
  cliente: Cliente = new Cliente();
  error: any;
  constructor(private service: ClienteService,
              private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id: number  = +params.get('id');
      if(id){
        this.service.ver(id).subscribe(cliente => this.cliente = cliente)
      }
    })
  }

  public crear():void{
    console.log(this.cliente);
    this.service.crear(this.cliente).subscribe( cliente =>{
      console.log(cliente);
        Swal.fire('Exito: ',`Cliente ${cliente.nombre} creado con exito`,'success');
        this.router.navigate(['/clientes']);
    }, err => {
      if(err.status === 500){
        this.error  = err.error;
        console.log(this.error)
      }
    });
  }


 public editar():void{
  this.service.editar(this.cliente).subscribe( cliente =>{
    console.log(cliente);
    Swal.fire('Exito: ',`Cliente ${cliente.nombre} actualizado con exito`,'success');
      this.router.navigate(['/clientes']);
  }, err => {
    if(err.status === 500){
      this.error  = err.error;
      console.log(this.error)
    }
  });
 }

}
