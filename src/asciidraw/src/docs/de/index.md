# Markdown Küchenspüle
Diese Datei ist https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet plus einige Korrekturen und Ergänzungen. Wird von [obedm503/bootmark](https://github.com/obedm503/bootmark) verwendet, um seine Styling-Funktionen zu [demonstrieren](https://obedm503.github.io/bootmark/docs/markdown-cheatsheet.html).

Dies ist als Kurzreferenz und Demonstration gedacht. Ausführlichere Informationen finden Sie in [John Grubers Originalspezifikation](http://daringfireball.net/projects/markdown/) und auf der [Github-flavored Markdown-Infoseite](http://github.github.com/github-flavored-markdown/).

Beachten Sie, dass es auch ein [Spickzettel speziell für Markdown hier](./Markdown-Here-Cheatsheet) gibt, falls Sie danach suchen. Sie können sich auch [weitere Markdown-Tools](./Other-Markdown-Tools) ansehen.

##### Inhaltsverzeichnis
[Kopfzeilen](#Kopfzeilen)  
[Hervorhebung](#Hervorhebung)  
[Listen](#Listen)  
[Links](#links)  
[Bilder](#Bilder)  
[Code- und Syntaxhervorhebung](#code)  
[Tabellen](#Tabellen)  
[Blockzitate](#blockquotes)  
[Inline-HTML](#html)  
[Horizontale Linie](#hr)  
[Zeilenumbrüche](#Zeilen)  
[YouTube-Videos](#videos)

<a name="header"></a>

## Überschriften

```keine Hervorhebung
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternativ können Sie für H1 und H2 einen unterstrichenen Stil verwenden:

Alt-H1
======

Alt-H2
------
```

# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternativ können Sie für H1 und H2 einen unterstrichenen Stil verwenden:

Alt-H1
======

Alt-H2
------

<a name="Hervorhebung"></a>

## Schwerpunkt

```keine Hervorhebung
Hervorhebung, auch Kursivschrift genannt, mit *Sternchen* oder _Unterstrichen_.

Starke Hervorhebung, auch Fettdruck genannt, mit **Sternchen** oder __Unterstrichen__.

Kombinierte Hervorhebung mit **Sternchen und _Unterstrichen_**.

Bei Durchgestrichen werden zwei Tilden verwendet. ~~Streichen Sie das.~~
```

Hervorhebung, auch Kursivschrift genannt, mit *Sternchen* oder _Unterstrichen_.

Starke Hervorhebung, auch Fettdruck genannt, mit **Sternchen** oder __Unterstrichen__.

Kombinierte Hervorhebung mit **Sternchen und _Unterstrichen_**.

Bei Durchgestrichen werden zwei Tilden verwendet. ~~Streichen Sie das.~~


<a name="Listen"></a>

## Listen

(In diesem Beispiel werden führende und nachfolgende Leerzeichen mit Punkten angezeigt: ⋅)

```keine Hervorhebung
1. Erstes geordnetes Listenelement
2. Ein weiterer Punkt
⋅⋅* Ungeordnete Unterliste.
1. Tatsächliche Zahlen sind nicht wichtig, nur dass es eine Zahl ist
⋅⋅1. Geordnete Unterliste
4. Und noch ein Punkt.

⋅⋅⋅Sie können Absätze innerhalb von Listenelementen richtig einrücken. Beachten Sie die Leerzeile oben und die führenden Leerzeichen (mindestens eines, aber wir verwenden hier drei, um auch das reine Markdown auszurichten).

⋅⋅⋅Für einen Zeilenumbruch ohne Absatz müssen Sie zwei Leerzeichen am Ende verwenden.⋅⋅
⋅⋅⋅Beachten Sie, dass diese Zeile separat ist, sich aber innerhalb desselben Absatzes befindet.⋅⋅
⋅⋅⋅ (Dies steht im Widerspruch zum typischen Zeilenumbruchverhalten von GFM, bei dem nachstehende Leerzeichen nicht erforderlich sind.)

* Ungeordnete Liste kann Sternchen verwenden
- Oder Minuspunkte
+ Oder Pluspunkte
```

1. Erstes geordnetes Listenelement
2. Ein weiterer Punkt
* Ungeordnete Unterliste.
1. Tatsächliche Zahlen sind nicht wichtig, nur dass es eine Zahl ist
1. Geordnete Unterliste
4. Und noch ein Punkt.

   Sie können Absätze innerhalb von Listenelementen richtig einrücken. Beachten Sie die Leerzeile oben und die führenden Leerzeichen (mindestens eines, aber wir verwenden hier drei, um auch das reine Markdown auszurichten).

   Um einen Zeilenumbruch ohne Absatz einzufügen, müssen Sie zwei nachstehende Leerzeichen verwenden.  
   Beachten Sie, dass diese Zeile separat ist, sich aber im selben Absatz befindet.  
   (Dies steht im Widerspruch zum typischen Zeilenumbruchverhalten von GFM, bei dem nachstehende Leerzeichen nicht erforderlich sind.)

* Ungeordnete Liste kann Sternchen verwenden
- Oder Minuspunkte
+ Oder Pluspunkte

<a name="links"></a>

## Links

Es gibt zwei Möglichkeiten, Links zu erstellen.

```keine Hervorhebung
[Ich bin ein Inline-Link](https://www.google.com)

[Ich bin ein Inline-Link mit Titel](https://www.google.com „Googles Homepage“)

[Ich bin ein Link im Referenzstil][Beliebiger Referenztext ohne Berücksichtigung der Groß- und Kleinschreibung]

[Ich bin eine relative Referenz auf eine Repository-Datei](../blob/master/LICENSE)

[Sie können Zahlen für Linkdefinitionen im Referenzstil verwenden][1]

Oder lassen Sie es leer und verwenden Sie den [Linktext selbst].

URLs und URLs in spitzen Klammern werden automatisch in Links umgewandelt.
http://www.example.com oder <http://www.example.com> und manchmal
example.com (aber beispielsweise nicht auf Github).

Etwas Text, um anzuzeigen, dass die Referenzlinks später folgen können.

[beliebiger, Groß-/Kleinschreibung ignorierender Referenztext]: https://www.mozilla.org
[1]: http://slashdot.org
[Linktext selbst]: http://www.reddit.com
```

[Ich bin ein Inline-Link](https://www.google.com)

[Ich bin ein Inline-Link mit Titel](https://www.google.com „Googles Homepage“)

[Ich bin ein Link im Referenzstil][Beliebiger Referenztext ohne Berücksichtigung der Groß- und Kleinschreibung]

[Ich bin eine relative Referenz auf eine Repository-Datei](../blob/master/LICENSE)

[Sie können Zahlen für Linkdefinitionen im Referenzstil verwenden][1]

Oder lassen Sie es leer und verwenden Sie den [Linktext selbst].

URLs und URLs in spitzen Klammern werden automatisch in Links umgewandelt.
http://www.example.com oder <http://www.example.com> und manchmal
example.com (aber beispielsweise nicht auf Github).

Etwas Text, um anzuzeigen, dass die Referenzlinks später folgen können.

[beliebiger, Groß-/Kleinschreibung ignorierender Referenztext]: https://www.mozilla.org
[1]: http://slashdot.org
[Linktext selbst]: http://www.reddit.com

<a name="Bilder"></a>

## Bilder

```keine Hervorhebung
Hier ist unser Logo (bewegen Sie den Mauszeiger, um den Titeltext anzuzeigen):

Inline-Stil:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo-Titeltext 1")

Referenzstil:
![alternativer Text][Logo]

[Logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png „Logo-Titeltext 2“
```

Hier ist unser Logo (bewegen Sie den Mauszeiger, um den Titeltext anzuzeigen):

Inline-Stil:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo-Titeltext 1")

Referenzstil:
![alternativer Text][Logo]

[Logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png „Logo-Titeltext 2“

<a name="code"></a>

## Code- und Syntaxhervorhebung

Codeblöcke sind Teil der Markdown-Spezifikation, Syntaxhervorhebung jedoch nicht. Viele Renderer – wie Github und *Markdown Here* – unterstützen jedoch Syntaxhervorhebung. Welche Sprachen unterstützt werden und wie diese Sprachennamen geschrieben werden sollten, variiert von Renderer zu Renderer. *Markdown Here* unterstützt Hervorhebung für Dutzende von Sprachen (und Nicht-wirkliche-Sprachen, wie Diffs und HTTP-Header); die vollständige Liste und Anweisungen zum Schreiben der Sprachennamen finden Sie auf der [highlight.js-Demoseite](http://softwaremaniacs.org/media/soft/highlight/test.html).

```keine Hervorhebung
Inline-Code ist mit Backticks umgeben.
```

Inline-Code ist mit Backticks umgeben.

Codeblöcke sind entweder durch Zeilen mit drei Backticks <code>```</code> eingegrenzt oder mit vier Leerzeichen eingerückt. Ich empfehle, nur die eingegrenzten Codeblöcke zu verwenden – sie sind einfacher und nur sie unterstützen die Syntaxhervorhebung.

<pre lang="no-highlight"><code>```javascript
var s = "Hervorhebung der JavaScript-Syntax";
Alarm(e);
```
 
```Python
s = "Hervorhebung der Python-Syntax"
drucken
```
 
```
Keine Sprache angegeben, daher keine Syntaxhervorhebung.
Aber fügen wir ein <b>-Tag</b> ein.
```
</code></pre>



```Javascript
var s = "Hervorhebung der JavaScript-Syntax";
Alarm(e);
```

```Python
s = "Hervorhebung der Python-Syntax"
drucken
```

```
Keine Sprache angegeben, daher keine Syntaxhervorhebung in Markdown hier (variiert auf Github).
Aber fügen wir ein <b>Tag</b> ein.
```


<a name="Tabellen"></a>

## Tabellen

Tabellen sind nicht Teil der Markdown-Kernspezifikation, aber sie sind Teil von GFM und werden von *Markdown Here* unterstützt. Sie sind eine einfache Möglichkeit, Tabellen zu Ihrer E-Mail hinzuzufügen – eine Aufgabe, die sonst das Kopieren und Einfügen aus einer anderen Anwendung erfordern würde.

```keine Hervorhebung
Doppelpunkte können zum Ausrichten von Spalten verwendet werden.

| Tische | Sind | Cool |
| ------------- |:-------------:| -----:|
| Spalte 3 ist | rechtsbündig | 1600 $ |
| Spalte 2 ist | zentriert | $12 |
| Zebrastreifen | sind hübsch | 1 $ |

Die einzelnen Kopfzellen müssen durch mindestens drei Bindestriche getrennt sein.
Die äußeren Pipes (|) sind optional und Sie müssen die
Rohes Markdown wird hübsch ausgerichtet. Sie können auch Inline-Markdown verwenden.

Markdown | Weniger | Hübsch
--- | --- | ---
*Immer noch* | `rendert` | **schön**
1 | 2 | 3
```

Doppelpunkte können zum Ausrichten von Spalten verwendet werden.

| Tische | Sind | Cool |
| ------------- |:-------------:| -----:|
| Spalte 3 ist | rechtsbündig | 1600 $ |
| Spalte 2 ist | zentriert | $12 |
| Zebrastreifen | sind hübsch | 1 $ |

Die einzelnen Kopfzellen müssen durch mindestens drei Bindestriche getrennt sein. Die äußeren Pipes (|) sind optional und Sie müssen das reine Markdown nicht schön ausrichten. Sie können auch Inline-Markdown verwenden.

Markdown | Weniger | Hübsch
--- | --- | ---
*Immer noch* | `rendert` | **schön**
1 | 2 | 3

<a name="blockquotes"></a>

## Zitate

```keine Hervorhebung
> Blockzitate sind in E-Mails sehr praktisch, um Antworttext zu emulieren.
> Diese Zeile ist Teil desselben Zitats.

Zitatunterbrechung.

> Dies ist eine sehr lange Zeile, die beim Umbrechen immer noch richtig zitiert wird. Oh Mann, lass uns weiterschreiben, um sicherzustellen, dass sie lang genug ist, um für alle tatsächlich umgebrochen zu werden. Oh, du kannst **Markdown** in ein Blockzitat *einfügen*.
```

> Blockzitate sind in E-Mails sehr praktisch, um Antworttext zu emulieren.
> Diese Zeile ist Teil desselben Zitats.

Zitatunterbrechung.

> Dies ist eine sehr lange Zeile, die beim Umbrechen immer noch richtig zitiert wird. Oh Mann, lass uns weiterschreiben, um sicherzustellen, dass sie lang genug ist, um für alle tatsächlich umgebrochen zu werden. Oh, du kannst **Markdown** in ein Blockzitat *einfügen*.

<a name="html"></a>

## Inline-HTML

Sie können in Ihrem Markdown auch reines HTML verwenden, und das wird meistens ganz gut funktionieren.

```keine Hervorhebung
<dl>
  <dt>Definitionsliste</dt>
  <dd>Ist etwas, das die Leute manchmal verwenden.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Funktioniert *nicht* **sehr** gut. Verwenden Sie HTML-<em>Tags</em>.</dd>
</dl>
```

<dl>
  <dt>Definitionsliste</dt>
  <dd>Ist etwas, das die Leute manchmal verwenden.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Funktioniert *nicht* **sehr** gut. Verwenden Sie HTML-<em>Tags</em>.</dd>
</dl>

<a name="hr"></a>

## Horizontale Linie

```
Drei oder mehr …

---

Bindestriche

***

Sternchen

___

Unterstriche
```

Drei oder mehr …

---

Bindestriche

***

Sternchen

___

Unterstriche

<a name="Zeilen"></a>

## Zeilenumbrüche

Meine grundsätzliche Empfehlung zum Erlernen der Funktionsweise von Zeilenumbrüchen ist, zu experimentieren und herauszufinden – drücken Sie einmal die Eingabetaste (d. h., fügen Sie eine neue Zeile ein), dann drücken Sie sie zweimal (d. h., fügen Sie zwei neue Zeilen ein) und sehen Sie, was passiert. Sie werden bald lernen, das zu bekommen, was Sie wollen. „Markdown Toggle“ ist Ihr Freund.

Hier sind einige Dinge, die Sie ausprobieren können:

```
Hier ist eine Zeile für den Anfang.

Diese Zeile ist durch zwei Zeilenumbrüche von der darüberliegenden getrennt und stellt daher einen *separaten Absatz* dar.

Diese Zeile ist ebenfalls ein separater Absatz, aber ...
Diese Zeile ist nur durch eine einzelne neue Zeile getrennt und stellt daher eine separate Zeile im *gleichen Absatz* dar.
```

Hier ist eine Zeile für den Anfang.

Diese Zeile ist durch zwei Zeilenumbrüche von der darüberliegenden getrennt und stellt daher einen *separaten Absatz* dar.

Mit dieser Zeile beginnt auch ein separater Absatz, aber ...  
Diese Zeile ist nur durch eine einzelne neue Zeile getrennt und stellt daher eine separate Zeile im *gleichen Absatz* dar.

(Technischer Hinweis: *Markdown Here* verwendet GFM-Zeilenumbrüche, daher besteht keine Notwendigkeit, die Zeilenumbrüche mit zwei Leerzeichen von MD zu verwenden.)

<a name="videos"></a>

## YouTube-Videos

Sie können nicht direkt hinzugefügt werden, aber Sie können ein Bild mit einem Link zum Video wie folgt hinzufügen:

```keine Hervorhebung
<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg"
alt="BILD-ALT-TEXT HIER" width="240" height="180" border="10" /></a>
```

Oder in reinem Markdown, aber mit Verlust der Bildgröße und des Rahmens:

```keine Hervorhebung
[![ALT-BILDTEXT HIER](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
```
