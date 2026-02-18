<h1 align="center">Donne Argent</h1>

<p align="center">
Un village inquiétant. <br>
Le puits veut votre argent. <br> Donnez-le dès maintenant.
</p>

## ⚠️ WORK IN PROGRESS

Ce projet est un jeu en cours de développement, très loin d'être stable ou de proposer beaucoup de features. Testez à vos propres risques.
Je vais prochainement réécrire le projet avec zustand au lieu de koota pour le state management.

## 🚀 Structure du projet

Ce projet est réalisé grâce à:

- [Astro](https://astro.build)
- [React Three Fiber](https://www.react-three.org/)
- [tailwindcss](https://tailwindcss.com/)
- [bun](https://bun.sh/)
- [koota](https://github.com/pmndrs/koota)

```text
├── public
│   ├── fonts // Polices
│   └── models // Modèles 3D au format .glb
├── src
│   ├── components
│   │   ├── models // Code pour les modèles
│   │   ├── scene
│   │   └── types
│   ├── koota // Système de stage management
└── package.json
```

## 🧞 Commandes

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installe les dépendances                         |
| `bun dev`             | Démarre le serveur de dev local à l'adresse `localhost:4321`      |
| `bun build`           | Compile le code dans le dossier `./dist/`          |
| `bun preview`         | Prévisualise le code compilé avant déploiement     |
| `bun astro ...`       | Lance des commandes CLI comme `astro add`, `astro check` |
| `bun astro -- --help` | Demande de l'aide                  |
