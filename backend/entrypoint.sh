
./wait-for-it.sh mysql:3306 --timeout=60 -- echo "MySQL is up"


npx prisma db push
npx prisma migrate deploy
npm start
