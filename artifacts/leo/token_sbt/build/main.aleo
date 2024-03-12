program token_sbt.aleo;

record token:
    owner as address.private;
    amount as u64.private;


mapping account:
	key as address.public;
	value as u64.public;


mapping unalienable:
	key as u8.public;
	value as boolean.public;


mapping token_owner:
	key as boolean.public;
	value as address.public;

function initialize_token:
    input r0 as address.public;
    async initialize_token r0 into r1;
    output r1 as token_sbt.aleo/initialize_token.future;

finalize initialize_token:
    input r0 as address.public;
    contains token_owner[true] into r1;
    not r1 into r2;
    assert.eq r2 true;
    set r0 into token_owner[true];
    set true into unalienable[1u8];


function mint_public:
    input r0 as address.public;
    input r1 as u64.public;
    async mint_public r0 r1 into r2;
    output r2 as token_sbt.aleo/mint_public.future;

finalize mint_public:
    input r0 as address.public;
    input r1 as u64.public;
    get.or_use account[r0] 0u64 into r2;
    add r2 r1 into r3;
    set r3 into account[r0];


function mint_private:
    input r0 as address.private;
    input r1 as u64.private;
    cast r0 r1 into r2 as token.record;
    output r2 as token.record;


function transfer_public:
    input r0 as address.public;
    input r1 as u64.public;
    async transfer_public self.caller r0 r1 into r2;
    output r2 as token_sbt.aleo/transfer_public.future;

finalize transfer_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as u64.public;
    get unalienable[1u8] into r3;
    assert.neq r3 true;
    get.or_use account[r0] 0u64 into r4;
    sub r4 r2 into r5;
    set r5 into account[r0];
    get.or_use account[r1] 0u64 into r6;
    add r6 r2 into r7;
    set r7 into account[r1];


function transfer_private:
    input r0 as token.record;
    input r1 as address.private;
    input r2 as u64.private;
    sub r0.amount r2 into r3;
    cast r0.owner r3 into r4 as token.record;
    cast r1 r2 into r5 as token.record;
    async transfer_private into r6;
    output r4 as token.record;
    output r5 as token.record;
    output r6 as token_sbt.aleo/transfer_private.future;

finalize transfer_private:
    get unalienable[1u8] into r0;
    assert.neq r0 true;


function transfer_private_to_public:
    input r0 as token.record;
    input r1 as address.public;
    input r2 as u64.public;
    sub r0.amount r2 into r3;
    cast r0.owner r3 into r4 as token.record;
    async transfer_private_to_public r1 r2 into r5;
    output r4 as token.record;
    output r5 as token_sbt.aleo/transfer_private_to_public.future;

finalize transfer_private_to_public:
    input r0 as address.public;
    input r1 as u64.public;
    get unalienable[1u8] into r2;
    assert.neq r2 true;
    get.or_use account[r0] 0u64 into r3;
    add r3 r1 into r4;
    set r4 into account[r0];


function transfer_public_to_private:
    input r0 as address.public;
    input r1 as u64.public;
    cast r0 r1 into r2 as token.record;
    async transfer_public_to_private self.caller r1 into r3;
    output r2 as token.record;
    output r3 as token_sbt.aleo/transfer_public_to_private.future;

finalize transfer_public_to_private:
    input r0 as address.public;
    input r1 as u64.public;
    get unalienable[1u8] into r2;
    assert.neq r2 true;
    get.or_use account[r0] 0u64 into r3;
    sub r3 r1 into r4;
    set r4 into account[r0];
