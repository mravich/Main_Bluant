// ConsoleApplication6.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>

void beers_song();
int zbroj_niza();
void unesi_lozinku();
void tablica_mnozenja();
void izbornik();
void kalkulator();
int zbrajanje(int a, int b);
float oduzimanje(float a, float b);
double mnozenje(double a, double b);
double dijeljenje(double a, double b);
void krizic_kruzic();
void check_for_win();
void draw_table();
int unos_igraca(int igrac);
bool igraj;

using namespace std;

char polja_boarda[] = { '1','2','3','4','5','6','7','8','9' };
int unos, igrac = 1;
char pobjeda = 'P';
int zbroj;

int main()
{
	int a = 1, b = 2;
	//beers_song();
	//zbroj_niza();
	//unesi_lozinku();
	//tablica_mnozenja();
	//kalkulator
	//izbornik();
	igraj = true;
	krizic_kruzic();

	system("PAUSE");
	return 0;
}


void beers_song() {

	cout << "99 bottles of beer on the wall" << endl;

	for (int i = 98; i >= 1; i--) {

		if (i == 1) {
			cout << i << " bottle of beer on the wall" << endl;
		}
		else
			cout << i << " bottles of beer on the wall" << endl;

	}
}

int zbroj_niza() {


	do {

		cout << "Unesi broj :" << endl;
		cin >> unos;
		zbroj += unos;
		if (unos == 0) {

			cout << zbroj << endl;
		}

	} while (unos != 0);

	return zbroj;


}

void unesi_lozinku() {

	int lozinke[3];
	int lozinka_tocna = 1111;

	for (int i = 0; i <= 2; i++) {

		cout << "Unesi lozinku:" << endl;
		cin >> lozinke[i];
		if (lozinke[i] == lozinka_tocna) {

			cout << "Tocna lozinka!" << endl;
			break;
		}


	}

}

void tablica_mnozenja() {

	for (int i = 1; i <= 9; i++) {
		for (int j = 1; j <= 9; j++) {
			cout << i*j << "\t";
		}
		cout << endl;
	}

}
void izbornik() {
	int izbor;
	cout << "IZBORNIK" << endl;
	cout << "1. Beers Song " << "\t" << "2. Tablica Mnozenja" << "\t" << "3. Unesi Lozinku" << "\t" << "4. Zbroj niza" << "\t" << "5. Kalkulator" << endl;
	cin >> izbor;

	switch (izbor) {


	case 1:
		beers_song();
		break;

	case 2:
		tablica_mnozenja();
		break;

	case 3:
		unesi_lozinku();
		break;

	case 4:
		zbroj_niza();
		break;

	case 5:
		kalkulator();
		break;

	default:
		izbornik();
	}


}

void kalkulator() {

	int broj_1, broj_2, izbor;
	cout << "Unesi prvi broj:" << endl;
	cin >> broj_1;
	cout << "Unesi drugi broj:" << endl;
	cin >> broj_2;
	cout << "Odaberi operaciju" << endl;
	cout << "1. Zbrajanje " << "\t" << "2. Oduzimanje" << "\t" << "3. Mnozenje" << "\t" << "4. Dijeljenje" << endl;
	cin >> izbor;

	switch (izbor) {

	case 1:
		cout << zbrajanje(broj_1, broj_2) << endl;
		break;

	case 2:
		cout << oduzimanje(broj_1, broj_2) << endl;
		break;

	case 3:
		cout << mnozenje(broj_1, broj_2) << endl;
		break;
	case 4:
		cout << dijeljenje(broj_1, broj_2) << endl;
		break;
	default:
		kalkulator();



	}


}
int zbrajanje(int a, int b) {

	return a + b;

}

float oduzimanje(float a, float b) {

	return a - b;

}

double mnozenje(double a, double b) {

	return a*b;

}

double dijeljenje(double a, double b) {

	return a / b;

}


void krizic_kruzic() {

	int igrac_1_izbor, igrac_2_izbor;
	cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;





	char igrac_1 = 'X', igrac_2 = 'O';

	//DRAW BOARD
	do {

		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		draw_table();
		unos_igraca(igrac);
		check_for_win();


		if (igrac == 1) {

			igrac = 2;
		}
		else if (igrac == 2) {

			igrac = 1;
		}

	} while (igraj);
}

void check_for_win() {

	if (polja_boarda[0] == polja_boarda[3] && polja_boarda[6] == polja_boarda[0]) {

		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();


		igraj = false;
	}
	else if (polja_boarda[0] == polja_boarda[1] && polja_boarda[2] == polja_boarda[0]) {


		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();
		igraj = false;
	}
	else if (polja_boarda[0] == polja_boarda[4] && polja_boarda[8] == polja_boarda[0]) {


		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();
		igraj = false;

	}
	else if (polja_boarda[1] == polja_boarda[4] && polja_boarda[7] == polja_boarda[1]) {


		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();
		igraj = false;

	}
	else if (polja_boarda[3] == polja_boarda[4] && polja_boarda[5] == polja_boarda[3]) {


		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();
		igraj = false;

	}
	else if (polja_boarda[2] == polja_boarda[4] && polja_boarda[6] == polja_boarda[2]) {


		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();
		igraj = false;

	}
	else if (polja_boarda[2] == polja_boarda[5] && polja_boarda[8] == polja_boarda[2]) {


		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();
		igraj = false;

	}
	else if (polja_boarda[6] == polja_boarda[7] && polja_boarda[8] == polja_boarda[6]) {


		system("cls");
		cout << "\t" << "DOBRODOSLI NA IGRU KRIZIC KRUZIC!" << endl;
		cout << "POBJEDA " << igrac << " igraca!" << endl;
		draw_table();
		igraj = false;

	}

}

void draw_table() {


	cout << "\t" << polja_boarda[0] << "\t" << "|" << "\t" << polja_boarda[1] << "\t" << "|" << "\t" << polja_boarda[2] << "\t" << "|" << endl;
	cout << "________________|_______________|_______________|" << endl;
	cout << "\t" << polja_boarda[3] << "\t" << "|" << "\t" << polja_boarda[4] << "\t" << "|" << "\t" << polja_boarda[5] << "\t" << "|" << endl;
	cout << "________________|_______________|_______________|" << endl;
	cout << "\t" << polja_boarda[6] << "\t" << "|" << "\t" << polja_boarda[7] << "\t" << "|" << "\t" << polja_boarda[8] << "\t" << "|" << endl;
	cout << "________________|_______________|_______________|" << endl;

}

int unos_igraca(int igrac) {
	int igrac_1_izbor, igrac_2_izbor;
	if (igrac == 1) {
		cout << "Igrac 1. bira polje:" << endl;
		cin >> igrac_1_izbor;
		polja_boarda[igrac_1_izbor - 1] = 'X';
	}
	else if (igrac == 2) {

		cout << "Igrac 2. bira polje:" << endl;
		cin >> igrac_2_izbor;
		polja_boarda[igrac_2_izbor - 1] = 'O';
	}
	return 0;
}