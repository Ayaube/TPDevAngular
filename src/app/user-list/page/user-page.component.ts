import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProfilUtilisateur {
  user_id: number;
  company_id: number;
  imgUrl: string;
}

@Component({
  selector: 'app-page-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
})
export class PageUtilisateursComponent implements OnInit {
  profilsUtilisateurs: ProfilUtilisateur[] = [];
  totalUtilisateurs = 0;
  pourcentageHommes = 0;
  pourcentageFemmes = 0;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.recupererProfilsUtilisateurs();
  }

  recupererProfilsUtilisateurs() {
    this.http.get<ProfilUtilisateur[]>('http://127.0.0.1:5000/users').subscribe((donnees) => {
      this.profilsUtilisateurs = donnees;
      this.calculerStatistiques();
    });
  }

  calculerStatistiques() {
    this.totalUtilisateurs = this.profilsUtilisateurs.length;
    if (this.totalUtilisateurs > 0) {
      const hommes = this.profilsUtilisateurs.filter((profil) =>
        profil.imgUrl.includes('/men')
      ).length;
      const femmes = this.profilsUtilisateurs.filter((profil) =>
        profil.imgUrl.includes('/women')
      ).length;

      this.pourcentageHommes = (hommes / this.totalUtilisateurs) * 100;
      this.pourcentageFemmes = (femmes / this.totalUtilisateurs) * 100;
    }
  }

  suivreParId(index: number, profil: ProfilUtilisateur) {
    return profil.user_id;
  }
}
