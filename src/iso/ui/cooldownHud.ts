import "./cooldownHud.css";

// Anything with a total cooldown and a remaining time can be shown
type CooldownSource = { cooldown: number; readonly cooldownRemaining: number };

type Row = {
  source: CooldownSource;
  root: HTMLDivElement;
  fill: HTMLDivElement;
  time: HTMLSpanElement;
};

const container = document.createElement("div");
container.id = "cooldowns";
document.body.appendChild(container);

const rows: Row[] = [];

export const registerCooldown = (name: string, source: CooldownSource) => {
  const root = document.createElement("div");
  root.className = "cooldown";
  root.style.display = "none";

  const fill = document.createElement("div");
  fill.className = "cooldown-fill";

  const label = document.createElement("div");
  label.className = "cooldown-label";
  const nameEl = document.createElement("span");
  nameEl.textContent = name;
  const time = document.createElement("span");
  label.append(nameEl, time);

  root.append(fill, label);
  container.appendChild(root);
  rows.push({ source, root, fill, time });
};

// Rows are only visible while their cooldown is running
export const updateCooldownHud = () => {
  for (const { source, root, fill, time } of rows) {
    const remaining = source.cooldownRemaining;
    if (remaining <= 0) {
      root.style.display = "none";
      continue;
    }
    root.style.display = "";
    fill.style.transform = `scaleX(${Math.min(remaining / source.cooldown, 1)})`;
    time.textContent = `${remaining.toFixed(1)}s`;
  }
};
