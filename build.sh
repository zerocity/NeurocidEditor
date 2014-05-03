#rm dist.nw && \
grunt build && \
cp package.json dist && \
cp app/images/bp.png dist/images && \
cp app/images/yeoman.png dist/images && \
cd dist/ && \
zip -r ../${PWD##*/}.nw * && \
cd .. && \
cat nw dist.nw > Neurocid && chmod +x Neurocid
