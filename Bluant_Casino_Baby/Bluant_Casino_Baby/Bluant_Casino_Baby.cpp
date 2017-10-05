//BIBLIOTEKE
#include "stdafx.h"
#include <iostream>
#include <vector>
#include <ctime>
#include <string>
#include <fstream>
#include <stdlib.h>

using namespace std;

//VARIJABLE
int global_ammount_of_cash; //UBACITI NAPOCETKU I RACUNATI SA TIM!!
int global_number_of_chips = 1000; //NAPRAVI SA POINTEROM
string player_name;
int winnings;


//FUNKCIJE

void start_menu_casino();

void one_handed_jack_game_menu(int novac, int chipovi, string ime, int novac_u_slotu);

bool check_for_slot_win(char slot_one, char slot_two, char slot_three, int ulog);


void get_player_details();
void print_starting_text();
void menu_input_choice();
void menu_casino();
void change_cash_for_chips();
void cash_in();
void cash_out();
void change_chips_for_cash();
char slot_wheel_result(int number);
void one_handed_jack_game_text(char slot_1, char slot_2, char slot_3, bool win);
void choose_game();
void one_handed_jack_game();
void play_jack_game();
void lucky_dices_game();
void dices_game_text(bool win);
void play_dices_game();
int roll_the_dice();
bool check_for_dices_win(int player_dice_1, int comp_dice_1);
int main()
{
	srand(time(NULL));
	start_menu_casino();

	system("PAUSE");
	return 0;
}


void start_menu_casino() {
	get_player_details();
	print_starting_text();
	menu_input_choice();
}

void get_player_details() {
	//UZIMANJE PODATAKA O IMENU I IZNOSU NOVCA KOJIM RASPOLAZE IGRAC
	cout << "Unesite svoje ime: " << endl;
	getline(cin, player_name);
	cout << "Unesite iznos novca za uplatu u kasino: " << endl;
	cin >> global_ammount_of_cash;
	system("cls");
}

void print_starting_text() {
	cout << "\t \t DOBRODOSLI U CASINO INDIJANAC SAM MAJKO\n\n" << endl << "\t\t*" << player_name << "*" << "\t\t\t Novac: " << global_ammount_of_cash << endl << endl;
	cout << "\t\t\t  1. Uplata novca \n \t\t\t  2. Isplata Novca \n \t\t\t  3. Odabir igre \n \t\t\t  4. High Score \n \t\t\t  5. Izlaz iz Casina  \n\t\t\t  6. Zamjena novaca za chipove\n \t\t\t  7. Zamjena chipova za novac" << endl;
}

void menu_input_choice() {

	int unos_opcije, iznos_uplate;
	cout << endl << "Unesi broj opcije koju zelis koristiti :" << endl;
	cin >> unos_opcije;

	//OVDJE IZABERI KOJU OPCIJU OCES U MENIJU

	switch (unos_opcije)
	{

	case 1:
		cout << "Odabrali ste uplatu novca!" << endl;
		cout << "Drago nam je da ste se odlucili kockati sa nama! Molimo vas odaberite iznos za uplatu\n \t\t\t\t1chip = 5kn\nKoji iznos zelite uplatiti: " << endl;
		cin >> iznos_uplate;
		cout << "Prethodni iznos na racunu = " << global_ammount_of_cash << endl;
		global_ammount_of_cash = global_ammount_of_cash + iznos_uplate;
		cout << "Novi iznos na racunu: " << global_ammount_of_cash << endl;
		menu_casino();
		break;

	case 2:
		cash_out();
		break;
	case 3:
		choose_game();
		break;
	case 6:
		change_cash_for_chips();
		break;
	case 7:
		change_chips_for_cash();
		break;

	}
}
void menu_casino() {

	system("cls");
	cout << "\t \t DOBRODOSLI U CASINO INDIJANAC SAM MAJKO" << endl << "\t\t*" << player_name << "*" << "\t Chipova:" << global_number_of_chips << "\tNovaca :" << global_ammount_of_cash << endl << endl;
	cout << "\t\t\t  1. Uplata novca \n \t\t\t  2. Isplata Novca \n \t\t\t  3. Odabir igre \n \t\t\t  4. High Score \n \t\t\t  5. Izlaz iz Casina  \n\t\t\t  6. Zamjena novaca za chipove\n \t\t\t  7. Zamjena chipova za novac " << endl;
	menu_input_choice();

}

void change_cash_for_chips() {
	int money_ammount;
	cout << "\t \t\t ZAMJENA NOVCA ZA CHIPOVE" << endl << "\t\t*" << player_name << "*" << "\t Chipova:" << global_number_of_chips << "\tNovaca :" << global_ammount_of_cash << endl << endl;
	cout << "How much money would you like to change for chips?" << endl;
	cin >> money_ammount;
	while (money_ammount > global_ammount_of_cash) {

		cout << "Nedovoljno sredstava!" << endl;
		cash_in();
		change_cash_for_chips();

		break;

	}

	if (money_ammount <= global_ammount_of_cash) {

		global_number_of_chips = money_ammount / 5;
		global_ammount_of_cash = global_ammount_of_cash - money_ammount;
		menu_casino();
	}

}

void cash_in() {
	int iznos;
	cout << "Odaberi iznos za uplatu: " << endl;
	cin >> iznos;
	global_ammount_of_cash = global_ammount_of_cash + iznos;
}

void cash_out() {

	int iznos_isplate;
	cout << "Ukupno osvojenih cipova: " << global_number_of_chips << "\n Ukupno novaca u kasinu: " << global_ammount_of_cash << endl;
	cout << "Odaberi iznos novaca za isplatu: " << endl;
	cin >> iznos_isplate;

	while (iznos_isplate > global_ammount_of_cash) {

		cout << "NEDOVOLJNO SREDSTAVA ZA ISPLATU! PODIGNITE MANJE NOVACA ILI SE VRATITE IGRATI!" << endl;

	}
	if (iznos_isplate <= global_ammount_of_cash) {

		global_ammount_of_cash = global_ammount_of_cash - iznos_isplate;
		winnings += iznos_isplate;
		menu_casino();

	}

}
void change_chips_for_cash() {

	int chip_ammount;
	cout << "\t \t\t ZAMJENA CHIPOVA ZA NOVCE" << endl << "\t\t*" << player_name << "*" << "\t Chipova:" << global_number_of_chips << "\tNovaca :" << global_ammount_of_cash << endl << endl;
	cout << "How much chips would you like to change for money?" << endl;
	cin >> chip_ammount;
	while (chip_ammount > global_number_of_chips) {

		cout << "Nedovoljno sredstava!" << endl;
		change_chips_for_cash();

		break;

	}

	if (chip_ammount <= global_number_of_chips) {

		global_number_of_chips = global_number_of_chips - chip_ammount;
		global_ammount_of_cash = global_ammount_of_cash + chip_ammount * 5;
		menu_casino();
	}

}

void choose_game() {

	int odabir_igre;
	system("cls");
	cout << "\t \t DOBRODOSLI U CASINO INDIJANAC SAM MAJKO" << endl << "\t\t*" << player_name << "*" << "\t Chipova:" << global_number_of_chips << "\tNovaca :" << global_ammount_of_cash << endl << endl;
	cout << "\t\t 1. One Handed Indijanac Jack (Slotarka)\n \t\t 2. Roll them indijan dices!!\n \t\t 3. Double the indian in you or leave crying\n\n";
	cout << "Unesi broj igre: ";
	cin >> odabir_igre;

	switch (odabir_igre) {

	case 1:
		one_handed_jack_game();
		break;
	case 2:
		lucky_dices_game();
		break;
	case 3:
		cout << "Odabrali ste blackjack" << endl;
		break;
	default:
		choose_game();
		break;
	}

}

void one_handed_jack_game() {
	one_handed_jack_game_text('0', '0', '0', false);
	play_jack_game();
}

char slot_wheel_result(int number) {
	switch (number) {

	case 1:
		return '+';
		break;
	case 2:
		return 'X';
		break;
	case 3:
		return 'O';
		break;
	case 4:
		return '*';
		break;
	}
}

void one_handed_jack_game_text(char slot_1, char slot_2, char slot_3, bool win) {
	system("cls");
	cout << "\t     " << char(201) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(187) << "\n";
	cout << "\t     " << char(186) << " BLUANT CASINO FABULOUS SUPER EXCITING SLOT MACHINE " << char(186) << "\n";
	cout << "\t     " << char(200) << char(201) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(187) << char(188) << "\n";
	cout << "\t      " << char(186) << "  Player name " << "\t\tChips " << "\t\tMoney " << "\t " << char(186) << "\n";
	cout << "\t      " << char(186) << "    " << player_name << "\t\t" << global_number_of_chips << "\t\t" << global_ammount_of_cash << "\t " << char(186) << "\n";
	cout << "\t      " << char(200) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205)
		<< char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203)
		<< char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205)
		<< char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205)
		<< char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203)
		<< char(205) << char(205) << char(188) << "\n";
	cout << "\t\t " << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << "\n";
	cout << "\t\t " << char(200) << char(205) << char(205) << char(202) << char(205) << char(205) << char(206) << char(205) << char(205)
		<< char(206) << char(205) << char(205) << char(202) << char(205) << char(205) << char(202) << char(205) << char(205) << char(202)
		<< char(205) << char(205) << char(202) << char(205) << char(205) << char(202) << char(205) << char(205) << char(202) << char(205)
		<< char(205) << char(202) << char(205) << char(205) << char(202) << char(205) << char(205) << char(203) << char(205) << char(205)
		<< char(206) << char(205) << char(205) << char(202) << char(205) << char(205) << char(188) << "\n";
	cout << "\t\t       " << char(204) << char(205) << char(205) << char(188) << "\t**SLOT MACHINE**     " << char(200) << char(205) << char(205) << char(185) << "\n";
	cout << "\t\t       " << char(204) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(185) << "\n";
	//OVDJE IDE PRIKAZ SLOTOVA
	cout << "\t\t       " << char(186) << "\t" << slot_1 << "\t" << slot_2 << "\t" << slot_3 << "\t" << char(186) << "\n";
	cout << "\t     " << char(201) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(202) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(202) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(187) << "\n";
	cout << "\t     " << char(186) << " Spin : 's' " << "    Change bet : 'b' " << "   Leave table: 'L'" << char(186) << "\n";
	cout << "\t     " << char(200) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(203) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(203) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(188) << "\n";
	//OVDJE IDE WIN/LOSE
	if (win)
		cout << "\t\t\t   " << char(186) << "\t    " << " WIN \t " << char(186) << "\n";
	else
		cout << "\t\t\t   " << char(186) << "\t    " << " LOSE \t " << char(186) << "\n";

	cout << "\t\t\t   " << char(200) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(188) << "\n";
}

void play_jack_game() {
	char unos = 's'; //STAVIMO UNOS NAPOCETKU NA s KAKO BI DONJI WHILE KRENUO PRVI PUT
	char slot_1, slot_2, slot_3, slot_4;
	int ulog;
	cout << "Pick the bet ammount: " << endl;
	cin >> ulog;
	while ((unos == 's' || unos == 'S' || unos == 'l' || unos == 'L' || unos == 'b' || unos == 'B') && ulog <= global_number_of_chips) {
		if (unos == 'l' || unos == 'L') {

			choose_game();

		}
		else if (unos == 's' || unos == 'S') {
			slot_1 = slot_wheel_result(rand() % 4 + 1);
			slot_2 = slot_wheel_result(rand() % 4 + 1);
			slot_3 = slot_wheel_result(rand() % 4 + 1);
			one_handed_jack_game_text(slot_1, slot_2, slot_3, check_for_slot_win(slot_1, slot_2, slot_3, ulog));
		}
		else if (unos == 'b' || unos == 'B') {

			play_jack_game();
		}




		cout << "Press button :" << endl;
		cin >> unos;
	}


}

bool check_for_slot_win(char slot_one, char slot_two, char slot_three, int ulog) {
	if (slot_one == slot_two && slot_three == slot_one) {
		//Pomnozi ulog sa 3 i dodaj na ukupni broj chipova 
		//Igraj dalje
		global_number_of_chips = global_number_of_chips + ulog * 20;
		return true;
	}
	else {
		//Oduzmi ulog chipova i igraj dalje
		global_number_of_chips = global_number_of_chips - ulog;
		return false;
	}
}

void lucky_dices_game() {
	dices_game_text(NULL);
	play_dices_game();
}
void dices_game_text(bool win) {
	system("cls");
	cout << "\t     " << char(201) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(187) << "\n";
	cout << "\t     " << char(186) << "   BLUANT CASINO LUCKY SUPER ROLLING DICE MACHINE   " << char(186) << "\n";
	cout << "\t     " << char(200) << char(201) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(187) << char(188) << "\n";
	cout << "\t      " << char(186) << "  Player name " << "\t\tChips " << "\t\tMoney " << "\t " << char(186) << "\n";
	cout << "\t      " << char(186) << "    " << player_name << "\t\t" << global_number_of_chips << "\t\t" << global_ammount_of_cash << "\t " << char(186) << "\n";
	cout << "\t      " << char(200) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205)
		<< char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203)
		<< char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205)
		<< char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205)
		<< char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203) << char(205) << char(205) << char(203)
		<< char(205) << char(205) << char(188) << "\n";
	cout << "\t\t " << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << char(176) << char(176) << char(186) << char(176) << char(176) << char(186) << char(176)
		<< char(176) << char(186) << "\n";
	cout << "\t\t " << char(204) << char(205) << char(205) << char(202) << char(205) << char(205) << char(202) << char(205) << char(205)
		<< char(206) << char(205) << char(205) << char(202) << char(205) << char(205) << char(202) << char(205) << char(205) << char(202)
		<< char(205) << char(205) << char(202) << char(205) << char(205) << char(202) << char(205) << char(205) << char(202) << char(205)
		<< char(205) << char(202) << char(205) << char(205) << char(202) << char(205) << char(205) << char(206) << char(205) << char(205)
		<< char(202) << char(205) << char(205) << char(202) << char(205) << char(205) << char(185) << "\n";
	cout << "\t\t " <<char(186)<<" Player "<<char(186)<<" Roll:R   Bet:B   Leave:L "<<char(186)<<"  Comp. "<<char(186)<< "\n";
	cout << "\t\t " << char(204) << char(205) << char(205) << char(205) << char(205) << char(203) << char(205) << char(205) << char(205) << char(206)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(206) << char(205) << char(205) << char(205) << char(205) << char(203) << char(205)
		<< char(205) << char(205)  << char(185)<<"\n";

	//OVDJE STAVITI OVISNO O WIN/LOSE I REZULTATE KOCKICA
	if(win)
	cout << "\t\t " << char(186) <<"  2 "<<char(186)<<" 1 "<<char(186)<<" Winner is: PLAYER!       "<<char(186)<<"  2 "<<char(186)<<" 3 "<<char(186) <<"\n";
	else 
	cout << "\t\t " << char(186) <<"  2 " << char(186) <<" 1 " << char(186) << " Winner is: COMPUTER!     " << char(186) << "  2 " << char(186) << " 3 " << char(186) << "\n";

	cout << "\t\t " << char(200) << char(205) << char(205) << char(205) << char(205) << char(202) << char(205) << char(205) << char(205) << char(202) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205) << char(205)
		<< char(205) << char(202) << char(205) << char(205) << char(205) << char(205) << char(202) << char(205) << char(205) << char(205) << char(188)  << "\n";

}

void play_dices_game() {
	char roll;
	char unos;
	int ulog=0;
	int player_dice_1, player_dice_2, comp_dice_1, comp_dice_2;
	cout << "Pick the bet ammount: " << endl;
	cin >> ulog;
	cout << "Press button: ";
	cin >> unos;
	
	while ((unos == 'r' || unos == 'R' || unos == 'b' || unos == 'l' || unos == 'B' || unos == 'L') && ulog <= global_number_of_chips) {
	
		if (unos == 'l' || unos == 'L') {
		
			choose_game();
		}
		else if (unos == 'r' || unos == 'R') {
			cout << "Player roll the dice first!\n Press R to roll: " << endl;
			cin >> roll;
			player_dice_1 = roll_the_dice();
			cout << "Computer rolls the dice second!\n" << endl;
			comp_dice_1 = roll_the_dice();
			dices_game_text(check_for_dices_win(player_dice_1, comp_dice_1));
		
		}
		else if (unos == 'b' || unos == 'B') {
		
			play_dices_game();
		
		}
	
	}

}

int roll_the_dice() {

	return rand() % 6 + 1;

}
bool check_for_dices_win(int player_dice_1, int comp_dice_1) {

	if (player_dice_1 > comp_dice_1) {
	

		return true;
	}
	else if (player_dice_1 < comp_dice_1) {

		return false;

	}
	else
		return 0;
}