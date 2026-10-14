# LUX AUTO – strona statyczna

Otwórz `index.html` w przeglądarce (działa z dysku) albo wgraj całą zawartość folderu do repozytorium GitHub Pages.

- **Dane** (telefony, adresy, usługi, flota, opinie): `js/data.js`
- **Wspólny nagłówek, menu, stopka i treść stron**: `js/app.js`
- **Wygląd**: `css/style.css`

## Miejsce na prawdziwe wideo/zdjęcie w tle (strona główna i „Pomoc drogowa”)
W `js/app.js` znajdź `var heroMedia = { index: "", "pomoc-drogowa": "" };` i wpisz ścieżkę, np.
`index: "video/hero.mp4"` albo `"pomoc-drogowa": "img/laweta.webp"`. Plik wrzuć do `video/` lub `img/`.
Wideo: bez dźwięku, ~720p, do 2–3 MB, np.
`ffmpeg -i wejscie.mp4 -an -vf scale=-2:720 -c:v libx264 -crf 30 -movflags +faststart video/hero.mp4`

## Flota
Zdjęcia: `img/<nazwa>.webp` (960 px) i `img/<nazwa>-sm.webp` (640 px), wideo: `video/<nazwa>.mp4`.
Na telefonach pokazujemy tylko zdjęcia; wideo odtwarza się tylko na komputerze, gdy karta jest widoczna.

## Formularz (FormSubmit)
Formularz wysyła na szkody.luxauto@gmail.com przez formsubmit.co. **Przy pierwszym wysłaniu FormSubmit wysyła na tę skrzynkę e-mail aktywacyjny – właściciel musi kliknąć link aktywacyjny**, dopiero potem zgłoszenia zaczną dochodzić. Po wysłaniu użytkownik wraca na `kontakt.html?wyslano=1` z podziękowaniem.
