import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormGroup, FormControl, Validators } from "@angular/forms";

type CepResponse = {
	logradouro: string;
	localidade: string;
	uf: string;
} & { erro: boolean };

@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
	loading = false;
	form = new FormGroup({
		name: new FormControl("", [Validators.required]),
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required]),
		birthDate: new FormControl("", [Validators.required]),
		cep: new FormControl("", [Validators.required]),
		address: new FormControl("", [Validators.required]),
		city: new FormControl("", [Validators.required]),
		state: new FormControl("", [Validators.required]),
	});
	cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

	constructor(private http: HttpClient, private toastr: ToastrService) {}

	searchCep(e: Event) {
		e.preventDefault();
		const cep = this.form.get("cep")?.value;
		this.http
			.get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`)
			.pipe(
				map((res) => {
					if (res.erro) {
						throw "";
					}
					this.form.patchValue({
						address: res.logradouro,
						city: res.localidade,
						state: res.uf,
					});
				}),
				catchError((err) => {
					console.error(err);
					this.toastr.error(
						"Cannot find CEP, verify and try again",
						"Error"
					);
					throw "Error on search cep";
				})
			)
			.subscribe();
	}

	submit(e: Event) {
		e.preventDefault();
		this.loading = true;
		const url = `${environment.API_URL}/sign-up`;
		const data = this.form.value;
		this.http
			.post(url, data, { responseType: "text" })
			.pipe(
				map(() => {
					this.form.reset();
					this.loading = false;
					this.toastr.success("Registration successful", "Success");
				}),
				catchError((err) => {
					console.error(err);
					this.loading = false;

					if (err.status === 409)
						this.toastr.error("Email already in use", "Error");
					else if (err.status === 422)
						this.toastr.error(
							"Verify the fields and try again",
							"Error"
						);
					else
						this.toastr.error(
							"Cannot sign up, try again later",
							"Error"
						);

					throw "Error on sign up";
				})
			)
			.subscribe();
	}
}
