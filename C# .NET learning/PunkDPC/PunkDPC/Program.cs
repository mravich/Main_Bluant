using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using System.Media;
//
// Ime aplikacije : PunkeDPC
// Opis: Aplikacija koja radi cudne pokrete mišem i tipkovnicom te generira zvuk i fejk dijaloge sa korisnikom
// Topics: 
//         1) Threads
//         2) System.Windos.Forms namespace & assembly
//         3) Hidden application
//
//
namespace PunkDPC
{
    class Program
    {
        // Definiranje random-a _random stavljamo kako bi "znali" da je global varijabla
        public static Random _random = new Random();

        public static int _startupDelaySeconds = 10;
        public static int _prankDuration = 10;

        /// <summary>
        /// Ovdje poicinje aplikacija
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            Console.WriteLine("PunkDPC prank aplikacija by : Sanjin (aka. Mravich)");
            // CHECK FOR COMMAND LINE ARGUMENTS AND ASSIGN NEW VALUES
            if(args.Length >= 2)
            {

                _startupDelaySeconds = Convert.ToInt32(args[0]);
                _prankDuration = Convert.ToInt32(args[1]);
            }
            // Ovdje stvaramo sve threadove koji ce manipulirati inputom i outputom
            Thread drunkMouseThread = new Thread(new ThreadStart(DrunkMouseThread));
            Thread drunkKeyboardThread = new Thread(new ThreadStart(DrunkKeyboardThread));
            Thread drunkSoundThread = new Thread(new ThreadStart(DrunkSoundThread));
            Thread drunkPopoutThread = new Thread(new ThreadStart(DrunkPopoutThread));

            DateTime future = DateTime.Now.AddSeconds(10);
            Console.WriteLine("Waiting before starting threads");
            while (future > DateTime.Now)
            {
                Thread.Sleep(_startupDelaySeconds);
            }
            // Start all threads
            drunkMouseThread.Start();
            drunkKeyboardThread.Start();
            drunkSoundThread.Start();
            drunkPopoutThread.Start();

            future = DateTime.Now.AddSeconds(10);
            while (future > DateTime.Now)
            {
                Thread.Sleep(_prankDuration);
            }

            Console.WriteLine("Kill threads");
            drunkMouseThread.Abort();
            drunkKeyboardThread.Abort();
            drunkSoundThread.Abort();
            drunkPopoutThread.Abort();
        }
        #region
        /// <summary>
        /// This thread will effect mouse movements
        /// </summary>
        ///
        public static void DrunkMouseThread() {

            Console.WriteLine("Drunk mouse started");
            int moveX = 0;
            int moveY = 0;
            while (true) {
                // Random ammount to move mouse
                moveX = _random.Next(20) - 10;
                moveY = _random.Next(20) - 10;

                //Console.WriteLine(Cursor.Position.ToString());

                // Change mouse cursor position to new random coords
                Cursor.Position = new System.Drawing.Point(
                    Cursor.Position.X + moveX, 
                    Cursor.Position.Y - moveY);
                Thread.Sleep(50);
            }

        }
        public static void DrunkKeyboardThread()
        {
            Console.WriteLine("Drunk keyboard started");

            while (true)
            {
                // Generate random capital letter
                char key = (char)(_random.Next(25) + 65);

                // Generate 50/50 lower case letter
                if (_random.Next(2) == 0)
                {
                    key = Char.ToLower(key);
                }

                SendKeys.SendWait(key.ToString());
                Thread.Sleep(_random.Next(500));

            }
        }
        public static void DrunkSoundThread()
        {
            Console.WriteLine("Drunk sound started");

            while (true)
            {
                if (_random.Next(100) > 50)
                {
                    // RANDOM SELECT SOUNd
                    switch (_random.Next(5))
                    {

                        case 0:
                            SystemSounds.Asterisk.Play();
                            break;
                        case 1:
                            SystemSounds.Beep.Play();
                            break;
                        case 2:
                            SystemSounds.Exclamation.Play();
                            break;
                        case 3:
                            SystemSounds.Hand.Play();
                            break;
                        case 4:
                            SystemSounds.Question.Play();
                            break;
                    }
                    

                }
                Thread.Sleep(500);

            }
        }
        public static void DrunkPopoutThread()
        {
            Console.WriteLine("Drunk popout started");

            while (true)
            {
                // EVery 10 secs roll dice and show a dialog in 20% cases
                if (_random.Next(100) > 80)
                {
                    switch (_random.Next(2))
                    {
                        case 0:
                            MessageBox.Show("Your computer is not working",
                            "Something is wrong",
                            MessageBoxButtons.OK,
                            MessageBoxIcon.Error);
                            break;
                        case 1:
                            MessageBox.Show("You have a memory leak",
                            "Microsoft Windows",
                            MessageBoxButtons.OK,
                            MessageBoxIcon.Warning);
                            break;
                    }
                   
                    Thread.Sleep(10000);
                }
            }
        }

        #endregion

    }
}
