import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Avis {
  like: number;
  message_id: number;
  motif: string;
}

@Component({
  selector: 'app-donnees-satisfaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './satisfaction-data.component.html',
  styleUrl: './satisfaction-data.component.css',
})
export class DonneesSatisfactionComponent implements OnInit {
  avisList: Avis[] = [];
  avisAffiches: Avis[] = [];
  totalLikes = 0;
  totalDislikes = 0;
  pageActuelle = 1;
  itemsParPage = 10;
  totalPages = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.recupererAvis();
  }

  recupererAvis() {
    this.http.get<Avis[]>('http://127.0.0.1:5000/satisfaction').subscribe(donnees => {
      this.avisList = donnees;
      this.calculerTotaux();
      this.mettreAJourPagination();
      this.mettreAJourAvisAffiches();
    });
  }

  calculerTotaux() {
    this.totalLikes = this.avisList.filter(a => a.like === 1).length;
    this.totalDislikes = this.avisList.filter(a => a.like === 0).length;
  }

  mettreAJourPagination() {
    this.totalPages = Math.ceil(this.avisList.length / this.itemsParPage);
  }

  mettreAJourAvisAffiches() {
    const debut = (this.pageActuelle - 1) * this.itemsParPage;
    const fin = debut + this.itemsParPage;
    this.avisAffiches = this.avisList.slice(debut, fin);
  }

  changerDePage(page: number) {
    this.pageActuelle = Math.max(1, Math.min(page, this.totalPages));
    this.mettreAJourAvisAffiches();
  }

  rendreToutPositif() {
    this.avisList = this.avisList.map(avis => ({
      ...avis,
      like: 1,
      motif: "J'adore cette application ! Elle est superbe !"
    }));
    this.calculerTotaux();
    this.mettreAJourAvisAffiches();
  }

  melangerAvis() {
    this.avisList.forEach(avis => {
      avis.like = Math.round(Math.random()); // Génère un like ou dislike aléatoire
      avis.motif = avis.like === 1
        ? "J'adore cette application ! Elle est superbe !"
        : "Je n'aime pas cette application ! Elle est nulle !";
    });
    this.calculerTotaux();
    this.mettreAJourAvisAffiches();
  }

  ajouterLike(index: number) {
    this.avisList[index].like = 1;
    this.avisList[index].motif = "J'adore cette application ! Elle est superbe !";
    this.calculerTotaux();
  }

  ajouterDislike(index: number) {
    this.avisList[index].like = 0;
    this.avisList[index].motif = "Je n'aime pas cette application ! Elle est nulle !";
    this.calculerTotaux();
  }
}
