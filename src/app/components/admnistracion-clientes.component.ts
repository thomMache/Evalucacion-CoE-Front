import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admnistracion-clientes',
  templateUrl: './admnistracion-clientes.component.html',
  styleUrls: ['./admnistracion-clientes.component.css']
})
export class AdmnistracionClientesComponent implements OnInit {

  clientes: Cliente[];
  titulo = 'Administración de Cliente';
  constructor(private service: ClienteService) { }

  ngOnInit(){

    this.service.listar().subscribe(clientes =>this.clientes = clientes);
  }

  public eliminar(cliente: Cliente): void{


    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${cliente.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {

      if (result.value) {
        this.service.eliminar(cliente.id).subscribe(() => {
          this.clientes = this.clientes.filter(a => a !== cliente);
          Swal.fire('Exito: ',`Alumno ${cliente.nombre} eliminando con éxito`,'success');
        });
      }
    });


  }
}
