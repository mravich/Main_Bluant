// Bluant_Clinic.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <vector>
#include <string>
#include <fstream>
using namespace std;


struct pacijent {
	int mbo;
	string ime, prezime;
	vector<string>popis_lijekova;
};


//FUNKCIJE
void meni();
void menu_choice(int izbor);
void unos_pacijenata();
void ispis_pacijenata();
void pretraga_po_mbo();
void cekaonica();
void dodavanje_recepata();
void izlaz();
void prikaz_pacijenta(pacijent pacijent);
void zapis_pacijenta(pacijent pacijent);
void ucitavanje_pacijenata_iz_vanjske_datoteke();
void zapis_ljekova_po_pacijentu(int mbo, vector<string> popis_lijekova);

vector<string>popis_lijekova_po_pacijentu;
vector<pacijent>lista_pacijenata;


int main()
{

	meni();
	system("PAUSE");
	return 0;
}


void meni() {
	system("cls");
	int choice;
	cout << "\t\t\t   " << char(197) << " BLUANT CLINIC " << char(197) << endl << endl;
	cout << "\t\t" << "1. Unos novih pacijenata u bluant kartoteku\n\t\t2.Ispis svih pacijenata\n\t\t3.Pretraga pacijenata po MBO\n\t\t4.Cekaonica\n\t\t5.Dodavanje recepata\n\t\t6.Izlaz iz klinike" << endl;
	cout << "(Unesite broj ispred opcije koju zelite koristiti(1-6) za izlaz iz klinike unesite :izlaz" << endl;
	cin >> choice;
	menu_choice(choice);
}

void menu_choice(int izbor) {

	switch (izbor) {

	case 1:
		unos_pacijenata();
		break;

	case 2:
		ispis_pacijenata();
		break;
	case 3:
		pretraga_po_mbo();
		break;
	case 4:
		cekaonica();
		break;
	case 5:
		dodavanje_recepata();
		break;
	case 6:
		ucitavanje_pacijenata_iz_vanjske_datoteke();
		break;
	default:
		meni();
		break;
	}

}

void unos_pacijenata() {
	int unos = 1;
	string lijek;
	pacijent novi_pacijent;
	system("cls");
	cout << "\t\t\t   " << char(197) << " BLUANT CLINIC " << char(197) << endl << endl << endl;
	cout << "\t\t\t UNOS NOVIH PACIJENATA" << endl;
	cout << "\t\t\tUnesite 0 za prekid unosa" << endl;
	while (unos != 0) {
		cout << "Unesite MBO pacijenta:" << endl;
		cin >> novi_pacijent.mbo;
		cout << "Unesite ime pacijenta:" << endl;
		cin >> novi_pacijent.ime;
		cout << "Unesite prezime pacijenta:" << endl;
		cin >> novi_pacijent.prezime;
		do {
			cout << "Uzima li pacijent ikakve lijekove?(Za prekid unosa lijekova unesite 0)" << endl;
			cin >> lijek;
			if (lijek == "0")
				break;
			else
				novi_pacijent.popis_lijekova.push_back(lijek); //DODAVANJE LIJEKOVA U JEDINSTVENU PACIJENT STRUKTURU 
		} while (lijek != "0");
		lista_pacijenata.push_back(novi_pacijent); // DODAVANJE NOVOG PACIJENTA U LISTU SVIH PACIJENATA
		zapis_pacijenta(novi_pacijent); //ZAPISIVANJE NOVOG PACIJENTA U VANJSKU BAZU
		prikaz_pacijenta(novi_pacijent);
		menu_choice(0);
	}
}

void ispis_pacijenata() {
	system("cls");
	cout << "\t\t\t   " << char(197) << " BLUANT CLINIC " << char(197) << endl << endl << endl;
	cout << "\t\t\t ISPIS SVIH PACIJENATA" << endl;
	cout << "\t\t    Unesite 0 za povratak na izbornik" << endl << endl;

	for (int i = 0; i < lista_pacijenata.size() - 1; i++) {

		prikaz_pacijenta(lista_pacijenata[i]);

	}
	system("PAUSE");

}

void pretraga_po_mbo() {

	cout << "\t\t\t   " << char(197) << " BLUANT CLINIC " << char(197) << endl << endl << endl;
	cout << "\t\t\t PRETRAGA PACIJENATA PO MBO" << endl;
	cout << "\t\t\t      1. Binarno\n\t\t\t      2. Rekurzivno" << endl;
}

void cekaonica() {}

void dodavanje_recepata() {}

void izlaz() {}

void prikaz_pacijenta(pacijent pacijent) {
	cout << "MBO: " << pacijent.mbo;
	cout << "\tIME: " << pacijent.ime;
	cout << "\tPREZIME: " << pacijent.prezime << endl;
	cout << "\t\t  POPIS LIJEKOVA" << endl;
	for (int i = 0; i < pacijent.popis_lijekova.size(); i++) {
		cout << "\t\t" << i + 1 << "." << pacijent.popis_lijekova[i] << endl;
	}
}

void zapis_pacijenta(pacijent pacijent) {
	ofstream vanjska_lista_pacijenata;
	ofstream vanjska_lista_ljekova;
	vanjska_lista_pacijenata.open("lista_pacijenata.txt", ios::app);
	vanjska_lista_pacijenata << pacijent.mbo << "\t" << pacijent.ime << "\t" << pacijent.prezime << "\t";
	//OTVARANJE DATOTEKE ZA ZAPIS MBO I LJEKOVA
	vanjska_lista_ljekova.open("vanjska_lista_ljekova.txt", ios::app);
	//UPISIVANJE MBO PACIJENTA NA POCETAK REDA
	vanjska_lista_ljekova << endl << pacijent.mbo;


	//ZAPIS SVIH LIJEKOVA JEDNOG PACIJENTA U VANJSKU BAZU PORED IMENA
	for (int i = 0; i < pacijent.popis_lijekova.size(); i++) {
		//Zapis ljekova zajedno sa mbo za buducu pretragu
		vanjska_lista_ljekova << "\t" << pacijent.popis_lijekova[i];
		vanjska_lista_pacijenata << pacijent.popis_lijekova[i] << "\t";
	}
	vanjska_lista_pacijenata << endl;
	vanjska_lista_pacijenata.close();
}
void zapis_ljekova_po_pacijentu(int mbo, vector<string> popis_lijekova) {



}

void ucitavanje_pacijenata_iz_vanjske_datoteke() {

	ifstream vanjska_lista_pacijenata;

	string line;
	vanjska_lista_pacijenata.open("lista_pacijenata.txt");

	if (vanjska_lista_pacijenata) {

		do {

			pacijent ucitani_pacijent;
			vanjska_lista_pacijenata >> ucitani_pacijent.mbo >> ucitani_pacijent.ime >> ucitani_pacijent.prezime;
			lista_pacijenata.push_back(ucitani_pacijent);

		}

		while (getline(vanjska_lista_pacijenata, line));
		vanjska_lista_pacijenata.close();

		//SMISLIT KAKO UCITAT I LJEKOVE OD SVAKOG PACIJENTA
	}
	else
		cout << "NEMOGUCE OTVORITI DATOTEKU!" << endl;

	meni();

}