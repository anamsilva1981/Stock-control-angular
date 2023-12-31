import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserRequest } from 'app/models/interfaces/user/authUser';
import { SignupUserRequest } from 'app/models/interfaces/user/signUser';
import { UserService } from 'app/services/users/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private cockieService = inject(CookieService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  public loginCard: boolean = true;
  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  public signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  public onSumbitLoginForm(): void{
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthUserRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response){
            this.cockieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['./dashboard'])
            this.messageService.add({
              severity: 'Sucess',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response?.name}!`,
              life: 4000
            })
          }
        },
        error: (err) =>{
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Verifique os dados de login',
            life: 4000
          });
          console.log(err)
        }
      }
      )
    }
    console.log('Dados enviados', this.loginForm.value);
  }

  public onSubmitSignupForm(): void{
    if(this.signupForm.value && this.signupForm.valid){
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response){
            this.signupForm.reset();
            this.loginCard = true;
            this.messageService.add({
              severity: 'Sucess',
              summary: 'Sucesso',
              detail: 'Cadastro criado com sucesso!',
              life: 4000
            })
          }
        },
        error: (error) =>{
          this.loginForm.reset();
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Erro ao criar novo usuário',
            life: 4000
          });
          console.log('Erro capturado com sucesso ', error)
        }
      })
    }

  }

  public ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
