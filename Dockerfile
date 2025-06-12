FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
  curl \
  unzip \
  wget \
  git \
  build-essential \
  software-properties-common \
  && rm -rf /var/lib/apt/lists/*

RUN curl -o- https://fnm.vercel.app/install | bash \
    && export PATH="/root/.local/share/fnm:$PATH" \
    && eval "$(fnm env)" \
    && fnm install 22 \
    && fnm use 22

RUN apt-get update && apt-get install -y neovim \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/MrMoneyInTheBank/vim.git ~/.config/nvim
COPY . /zetamax

WORKDIR /zetamax
CMD ["/bin/bash"]

